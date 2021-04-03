import { forwardRef, memo, MouseEventHandler, useMemo } from "react";
import { Link } from "react-router-dom";
import { size, styled } from "stitches.config";
import { IconContext } from "phosphor-react";
import { IconContextProps } from "phosphor-react/dist/lib";
import { ColorName, Colors } from "logic/Colors";

type IconButtonProps = {
  ref?: React.Ref<HTMLElement>;
  onClick?: MouseEventHandler<HTMLInputElement>;
  disabled?: boolean;
  type?: "submit" | "button";
  color?: ColorName;
  icon: React.ReactNode;
  small?: boolean;
  to?: string;
};

export const IconButton = memo<IconButtonProps>(
  forwardRef(
    (
      {
        icon,
        type = "button",
        disabled,
        onClick,
        to,
        small = false,
        color = "indigo",
      },
      ref
    ) => {
      const Elem = to ? (Link as any) : "button";

      const iconConfig = useMemo(
        (): IconContextProps => ({
          color: "currentColor",
          size: small ? size(1, 0) : size(1, 2),
          weight: "regular",
          mirrored: false,
        }),
        [small]
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
            css={{
              backgroundColor: disabled ? Colors.grey(400) : Colors[color](500),
              cursor: disabled ? "not-allowed" : "pointer",
              "&:hover": {
                backgroundColor: disabled
                  ? Colors.grey(400)
                  : Colors[color](600),
              },
            }}
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
