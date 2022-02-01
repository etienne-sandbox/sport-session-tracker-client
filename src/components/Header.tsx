import { memo } from "react";
import { css, styled } from "stitches.config";
import { Barbell, HouseLine } from "phosphor-react";
import { Spacer } from "./Spacer";
import { Loader } from "./Loader";
import { ActionWrapper } from "./ActionWrapper";
import { IconButton } from "./IconButton";
import { Colors } from "logic/Colors";

type Props = {
  title?: string;
  rightAction?: React.ReactNode | null;
  leftAction?: React.ReactNode | null;
  loading?: boolean;
};

export const Header = memo<Props>(
  ({
    leftAction = (
      <ActionWrapper>
        <IconButton to="/" icon={<HouseLine />} />
      </ActionWrapper>
    ),
    rightAction,
    title = "Workout Tracker",
    loading = false,
  }) => {
    return (
      <HeaderEl>
        <Spacer horizontal={2} />
        <SideBox>{leftAction}</SideBox>
        <Title>
          {loading ? (
            <Loader size={30} className={noFlexShrink()} />
          ) : (
            <Barbell size={30} className={noFlexShrink()} />
          )}
          <Spacer horizontal={4} />
          <TitleText>{title}</TitleText>
        </Title>
        <SideBox style={{ flexDirection: "row-reverse" }}>
          {rightAction}
        </SideBox>
        <Spacer horizontal={2} />
      </HeaderEl>
    );
  }
);

const noFlexShrink = css({ flexShrink: 0 });

const SideBox = styled("div", {
  width: "$70",
  display: "flex",
  flexDirection: "row",
});

const HeaderEl = styled("header", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  textAlign: "center",
  minHeight: "$24",
  marginBottom: 0,
  backgroundColor: Colors.white,
  boxShadow: "$soft",
  borderRadius: "$big",
});

const Title = styled("h1", {
  flex: 1,
  margin: "0",
  fontHeight: "$20",
  display: "flex",
  alignSelf: "center",
  flexDirection: "row",
  alignItems: "center",
  paddingRight: "$02",
  color: Colors.blueGrey(900),
  justifyContent: "center",
});

const TitleText = styled("span", {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});
