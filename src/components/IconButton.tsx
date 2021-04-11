import { forwardRef, memo, MouseEventHandler, useMemo } from "react";
import { Link } from "react-router-dom";
import { size, styled } from "stitches.config";
import { IconContext } from "phosphor-react";
import { IconContextProps } from "phosphor-react/dist/lib";
import { ColorName, Colors } from "logic/Colors";

export type IconWeight =
  | "thin"
  | "light"
  | "regular"
  | "bold"
  | "fill"
  | "duotone";

type IconButtonProps = {
  ref?: React.Ref<HTMLElement>;
  shade?: number;
  size?: number;
  weight?: IconWeight;
  onClick?: MouseEventHandler<HTMLInputElement>;
  disabled?: boolean;
  type?: "submit" | "button";
  color?: ColorName;
  icon: React.ReactNode;
  to?: string;
};

const DEFAULT_SIZE = size(1, 2);

export const IconButton = memo<IconButtonProps>(
  forwardRef(
    (
      {
        icon,
        type = "button",
        weight = "regular",
        disabled,
        onClick,
        to,
        size = DEFAULT_SIZE,
        color = "indigo",
        shade = 500,
      },
      ref
    ) => {
      const Elem = to ? (Link as any) : "button";

      const iconConfig = useMemo(
        (): IconContextProps => ({
          color: "currentColor",
          size,
          weight,
          mirrored: false,
        }),
        [size, weight]
      );

      return (
        <IconContext.Provider value={iconConfig}>
          <IconButtonElem
            as={Elem}
            ref={ref}
            onClick={onClick}
            disabled={disabled}
            type={type}
            to={to}
            css={
              disabled
                ? {
                    backgroundColor: Colors.grey(300),
                    cursor: "not-allowed",
                  }
                : {
                    backgroundColor: Colors[color](shade),
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: Colors[color](shade + 100),
                    },
                  }
            }
          >
            {icon}
          </IconButtonElem>
        </IconContext.Provider>
      );
    }
  )
);

const IconButtonElem = styled("button", {
  margin: 0,
  padding: "$02",
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "$medium",
  color: Colors.white,
});
