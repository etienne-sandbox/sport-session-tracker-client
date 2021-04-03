import { ColorName, Colors } from "logic/Colors";
import { IconContextProps } from "phosphor-react/dist/lib";
import { IconContext } from "phosphor-react";
import { Fragment, memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { size, styled } from "stitches.config";
import { Spacer } from "./Spacer";

type ButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  leftIcon?: React.ReactElement | null;
  rightIcon?: React.ReactElement | null;
  type?: "submit" | "button";
  color?: ColorName;
  compact?: boolean;
  text: string;
  to?: string;
};

export const Button = memo<ButtonProps>(
  ({
    text,
    type = "button",
    disabled,
    onClick,
    to,
    color = "indigo",
    leftIcon,
    rightIcon,
    compact = false,
  }) => {
    const Elem = to ? (Link as any) : "button";

    const iconSpace = compact ? 2 : 4;

    const iconConfig = useMemo(
      (): IconContextProps => ({
        color: "currentColor",
        size: size(1, 1),
        weight: "regular",
        mirrored: false,
      }),
      []
    );

    const singleIcon =
      [leftIcon, rightIcon].filter((v) => Boolean(v)).length === 1;
    const hasText = text.trim().length > 0;
    const singleIconSpace = singleIcon && hasText && <Spacer horizontal={2} />;

    return (
      <IconContext.Provider value={iconConfig}>
        <ButtonElem
          as={Elem}
          onClick={onClick}
          disabled={disabled}
          type={type}
          to={to}
          css={{
            backgroundColor: disabled ? Colors.grey(400) : Colors[color](500),
            cursor: disabled ? "not-allowed" : "pointer",
            "&:hover": {
              backgroundColor: disabled ? Colors.grey(400) : Colors[color](600),
            },
          }}
        >
          {leftIcon ? (
            <Fragment>
              {leftIcon}
              {hasText && <Spacer horizontal={iconSpace} />}
            </Fragment>
          ) : (
            singleIconSpace
          )}
          <ButtonText>{text}</ButtonText>
          {rightIcon ? (
            <Fragment>
              {hasText && <Spacer horizontal={iconSpace} />}
              {rightIcon}
            </Fragment>
          ) : (
            singleIconSpace
          )}
        </ButtonElem>
      </IconContext.Provider>
    );
  }
);

const ButtonText = styled("span", {
  fontHeight: "$11",
});

const ButtonElem = styled("button", {
  textTransform: "none",
  textDecoration: "none",
  margin: 0,
  fontFamily: "$spaceGrotesk",
  paddingLeft: "$04",
  paddingRight: "$04",
  paddingTop: "$02",
  paddingBottom: "$02",
  border: "none",
  borderRadius: "$medium",
  color: Colors.white,
  fontWeight: "$600",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});
