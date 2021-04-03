import { memo, useState } from "react";
import { User } from "logic/api";
import { User as UserIcon } from "phosphor-react";
import { IconButton } from "components/IconButton";
import { Popover } from "components/Popover";
import { styled } from "stitches.config";
import { usePopper } from "react-popper";
import { Overlay } from "react-oot";
import { Button } from "components/Button";
import { Spacer } from "components/Spacer";
import { useLogoutOrThrow } from "hooks/useLogout";

type Props = {
  me: User;
};

export const UserMenu = memo<Props>(({ me }) => {
  const logout = useLogoutOrThrow();
  const [refEl, setRefEl] = useState<HTMLElement | null>(null);
  const [popperEl, setPopperEl] = useState<HTMLDivElement | null>(null);

  const { styles, attributes } = usePopper(refEl, popperEl, {
    placement: "bottom-start",
    modifiers: [{ name: "offset", options: { offset: [0, 12] } }],
  });

  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton
        ref={setRefEl}
        onClick={() => setOpen((prev) => !prev)}
        icon={<UserIcon />}
      />
      {open && (
        <Overlay
          onClose={() => setOpen(false)}
          canEscapeKeyClose={true}
          canOutsideClickClose={true}
        >
          <Popover
            ref={setPopperEl}
            style={{ ...styles.popper, width: "200px" }}
            {...attributes.popper}
          >
            <HelloPara>
              Hello <Name>{me.firstName}</Name>
            </HelloPara>
            <Spacer vertical={2} />
            <Button onClick={logout} text="Logout" />
          </Popover>
        </Overlay>
      )}
    </>
  );
});

const Name = styled("span", { fontWeight: "$600" });

const HelloPara = styled("p", {
  paddingLeft: "$01",
  paddingRight: "$01",
  fontHeight: "$12",
  fontFamily: "$spaceGrotesk",
  fontWeight: "$400",
});
