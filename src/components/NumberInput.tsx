import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { styled } from "stitches.config";
import { usePopper } from "react-popper";
import { Popover } from "components/Popover";
import { Overlay } from "react-oot";
import { IconButton } from "./IconButton";
import { X, Check } from "phosphor-react";
import { Spacer } from "./Spacer";
import { Colors } from "logic/Colors";

type Props = {
  value: number;
  format?: (num: number) => string;
  precision?: number;
  onChange?: (num: number) => void;
};

export const NumberInput = memo<Props>(
  ({ value, format, precision = 2, onChange }) => {
    const onChangeRef = useRef(onChange);
    useEffect(() => {
      onChangeRef.current = onChange;
    }, [onChange]);

    const [refEl, setRefEl] = useState<HTMLInputElement | null>(null);
    const [popperEl, setPopperEl] = useState<HTMLDivElement | null>(null);

    const defaultFormat = useCallback((num: number) => num.toFixed(precision), [
      precision,
    ]);

    const { styles, attributes } = usePopper(refEl, popperEl, {
      placement: "top",
      modifiers: [{ name: "offset", options: { offset: [0, 12] } }],
    });

    const formatResolved = format ?? defaultFormat;

    const formatted = useMemo(() => formatResolved(value), [
      formatResolved,
      value,
    ]);

    const [inputValue, setInputValue] = useState(formatted);
    const [open, setOpen] = useState(false);

    const onFocus = useCallback(() => {
      setInputValue(formatted);
      setTimeout(() => {
        setOpen(true);
      }, 0);
    }, [formatted]);

    const inputValueFormatted = useMemo(() => {
      const num = parseFloat(inputValue || "0");
      if (Number.isNaN(num)) {
        return null;
      }
      return formatResolved(num);
    }, [formatResolved, inputValue]);

    const [closeRequested, setCloseRequested] = useState(false);

    const onClose = useCallback(() => {
      if (inputValueFormatted === null) {
        setCloseRequested(true);
        return;
      }
      setOpen(false);
      if (refEl) {
        refEl.blur();
      }
      if (onChangeRef.current) {
        onChangeRef.current(parseFloat(inputValueFormatted));
      }
    }, [inputValueFormatted, refEl]);

    const onCancel = useCallback(() => {
      setOpen(false);
      setCloseRequested(false);
      if (refEl) {
        refEl.blur();
      }
    }, [refEl]);

    const changed = inputValue !== inputValueFormatted;

    const showHelper = open && changed;

    useEffect(() => {
      if (showHelper) {
        return;
      }
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onCancel();
        }
      };
      window.addEventListener("keydown", onKey, false);
      return () => {
        window.removeEventListener("keydown", onKey, false);
      };
    }, [onCancel, showHelper]);

    return (
      <Fragment>
        {open ? (
          <Input
            ref={setRefEl}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setCloseRequested(false);
            }}
            mode={
              inputValueFormatted === null && closeRequested
                ? "error"
                : undefined
            }
            onBlur={() => {
              if (!showHelper) {
                onClose();
              }
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onClose();
              }
            }}
          />
        ) : (
          <Input ref={setRefEl} readOnly value={formatted} onFocus={onFocus} />
        )}
        {showHelper && (
          <Overlay
            onClose={(e) => {
              if (e instanceof KeyboardEvent) {
                onCancel();
                return;
              }
              const isInput = e instanceof MouseEvent && e.target === refEl;
              if (!isInput) {
                onClose();
              }
            }}
            canEscapeKeyClose={true}
            canOutsideClickClose={true}
          >
            <Popover
              ref={setPopperEl}
              style={{
                ...styles.popper,
              }}
              css={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "$02",
              }}
              {...attributes.popper}
            >
              <Preview>
                {inputValueFormatted
                  ? `Do you mean ${inputValueFormatted} ?`
                  : "Invalid Number"}
              </Preview>
              <Spacer horizontal={2} />
              <IconButton small color="red" onClick={onCancel} icon={<X />} />
              <Spacer horizontal={2} />
              <IconButton
                small
                color="green"
                onClick={onClose}
                icon={<Check />}
                disabled={inputValueFormatted === null}
              />
            </Popover>
          </Overlay>
        )}
      </Fragment>
    );
  }
);

const Preview = styled("span", {
  fontHeight: "$14",
  display: "inline-block",
  paddingLeft: "$04",
  paddingRight: "$04",
  whiteSpace: "nowrap",
});

const Input = styled("input", {
  margin: 0,
  textAlign: "center",
  width: 1,
  flex: 1,
  fontHeight: "$12",
  height: "$14",
  fontFamily: "$spaceGrotesk",
  paddingLeft: "$02",
  paddingTop: "0",
  paddingBottom: "0",
  paddingRight: "$02",
  borderWidth: "$small",
  borderColor: Colors.blue(300),
  borderStyle: "solid",
  backgroundColor: Colors.indigo(50),
  borderRadius: "$medium",
  variants: {
    mode: {
      error: {
        borderColor: Colors.red(500),
      },
    },
  },
});
