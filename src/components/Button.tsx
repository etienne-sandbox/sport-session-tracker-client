import { ColorName, Colors } from "logic/Colors";
import { IconProps } from "phosphor-react";
import { IconContext } from "phosphor-react";
import { forwardRef, Fragment, memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { Spacer } from "./Spacer";
import styled from "styled-components";
import { fontHeightGrid, grid } from "../logic/Design";

type ButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  leftIcon?: React.ReactElement | null;
  rightIcon?: React.ReactElement | null;
  type?: "submit" | "button";
  color?: ColorName;
  compact?: boolean;
  textAlign?: "left" | "right" | "center";
  text: string | React.ReactElement | null;
  to?: string;
} & React.HTMLAttributes<HTMLButtonElement>;

export const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    {
      text,
      type = "button",
      disabled,
      onClick,
      to,
      color = "indigo",
      leftIcon,
      rightIcon,
      compact = false,
      textAlign = "center",
      ...buttonProps
    }: ButtonProps,
    ref
  ) {
    const Elem = to ? (Link as any) : "button";

    const iconSpace = compact ? 2 : 4;

    const iconConfig = useMemo(
      (): IconProps => ({
        color: "currentColor",
        size: grid(1, 0, 0, 1),
        weight: "regular",
        mirrored: false,
      }),
      []
    );

    const singleIcon =
      [leftIcon, rightIcon].filter((v) => Boolean(v)).length === 1;
    const hasText =
      typeof text === "string" ? text.trim().length > 0 : text !== null;
    const singleIconSpace = singleIcon && hasText && <Spacer horizontal={2} />;

    return (
      <IconContext.Provider value={iconConfig}>
        <ButtonElem
          as={Elem}
          onClick={onClick}
          disabled={disabled}
          type={type}
          to={to}
          style={{
            backgroundColor: disabled ? Colors.grey(400) : Colors[color](500),
            cursor: disabled ? "not-allowed" : "pointer",

            "&:hover": {
              backgroundColor: disabled ? Colors.grey(400) : Colors[color](600),
            },
          }}
          ref={ref}
          {...buttonProps}
        >
          {leftIcon ? (
            <Fragment>
              {leftIcon}
              {hasText && <Spacer horizontal={iconSpace} />}
            </Fragment>
          ) : (
            singleIconSpace
          )}
          <ButtonText
            style={{
              textAlign: textAlign,
            }}
          >
            {text}
          </ButtonText>
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
  })
);

const ButtonText = styled.span({
  ...fontHeightGrid(1, 0, 0, 1),
  flex: 1,
});

const ButtonElem = styled.button({
  textTransform: "none",
  textDecoration: "none",
  margin: 0,
  fontFamily: '"Space Grotesk", sans-serif',
  paddingLeft: grid(0, 1),
  paddingRight: grid(0, 1),
  paddingTop: grid(0, 0, 1),
  paddingBottom: grid(0, 0, 1),
  border: "none",
  borderRadius: grid(0, 0, 1),
  color: Colors.white,
  fontWeight: 600,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});
