import { Fragment, memo, useState } from "react";
import { Button } from "./Button";
import { CaretDown, CaretUp } from "phosphor-react";
import { Overlay } from "react-oot";
import { Popover } from "./Popover";
import { usePopper } from "react-popper";
import { styled } from "stitches.config";
import { Colors } from "logic/Colors";

type Props<Item extends string> = {
  selected: Item;
  items: Array<Item>;
  renderItem: (item: Item) => React.ReactElement | string | null;
  onChange: (item: Item) => void;
};

export function Select<Item extends string>(props: Props<Item>) {
  return <SelectInternal {...(props as any)} />;
}

const SelectInternal = memo<Props<string>>(
  ({ selected, items, renderItem, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const [refEl, setRefEl] = useState<HTMLElement | null>(null);
    const [popperEl, setPopperEl] = useState<HTMLElement | null>(null);

    const { styles, attributes } = usePopper(refEl, popperEl, {
      placement: "bottom-start",
      modifiers: [{ name: "offset", options: { offset: [0, 5] } }],
    });

    return (
      <Fragment>
        <Button
          text={renderItem(selected)}
          rightIcon={isOpen ? <CaretUp /> : <CaretDown />}
          ref={setRefEl}
          onClick={() => {
            setIsOpen((p) => !p);
          }}
        />
        {isOpen && (
          <Overlay
            onClose={() => setIsOpen(false)}
            canEscapeKeyClose
            canOutsideClickClose
          >
            <Popover
              ref={setPopperEl}
              style={{
                ...styles.popper,
              }}
              {...attributes.popper}
            >
              <Items>
                {items.map((item, index) => (
                  <SelectItem
                    key={item}
                    onClick={() => {
                      onChange(item);
                      setIsOpen(false);
                    }}
                  >
                    {renderItem(item)}
                  </SelectItem>
                ))}
              </Items>
            </Popover>
          </Overlay>
        )}
      </Fragment>
    );
  }
);

const Items = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  minWidth: 100,
});

const SelectItem = styled("div", {
  cursor: "pointer",
  fontHeight: "$12",
  padding: "$01",
  paddingLeft: "$04",
  paddingRight: "$04",
  borderRadius: "$medium",
  "&:hover": {
    backgroundColor: Colors.indigo(50),
  },
});
