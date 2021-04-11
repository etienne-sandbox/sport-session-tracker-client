import { Colors } from "logic/Colors";
import { addBetween } from "logic/Utils";
import { HouseLine, MapPin, Users } from "phosphor-react";
import { memo } from "react";
import { size, styled } from "stitches.config";
import { IconButton } from "./IconButton";
import { Spacer } from "./Spacer";

type Props = {
  active: ActivePage;
};

const ICON_SIZE = size(1, 4);

const ITEMS = [
  { icon: HouseLine, link: "/", key: "home", color: "red" },
  { icon: MapPin, link: "/places", key: "places", color: "orange" },
  { icon: Users, link: "/users", key: "users", color: "green" },
] as const;

export type ActivePage = typeof ITEMS[number]["key"] | null;

export const LeftMenu = memo<Props>(({ active }) => {
  return (
    <Wrapper>
      {addBetween(
        ITEMS.map((item) => {
          const isActive = active === item.key;
          return (
            <IconButton
              key={item.key}
              size={ICON_SIZE}
              icon={
                <item.icon color={isActive ? Colors.white : Colors.grey(600)} />
              }
              to={item.link}
              color={isActive ? item.color : "grey"}
              weight={isActive ? "bold" : "regular"}
              shade={isActive ? 500 : 200}
            />
          );
        }),
        (index) => (
          <Spacer vertical={4} key={index} />
        )
      )}
    </Wrapper>
  );
});

const Wrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
});
