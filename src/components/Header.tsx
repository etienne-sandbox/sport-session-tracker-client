import { memo } from "react";
import { css, styled } from "stitches.config";
import { Barbell, HouseLine } from "phosphor-react";
import { Spacer } from "./Spacer";
import { Loader } from "./Loader";
import { ActionWrapper } from "./ActionWrapper";
import { IconButton } from "./IconButton";

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
    title = "Session Tracker",
    loading = false,
  }) => {
    return (
      <HeaderEl>
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
        <SideBox css={{ flexDirection: "row-reverse" }}>{rightAction}</SideBox>
      </HeaderEl>
    );
  }
);

const noFlexShrink = css({ flexShrink: 0 });

const SideBox = styled("div", {
  width: "$40",
  display: "flex",
  flexDirection: "row",
});

const HeaderEl = styled("header", {
  display: "flex",
  flexDirection: "row",
  alignItems: "stretch",
  justifyContent: "space-between",
  textAlign: "center",
  minHeight: "$22",
  margin: "$02",
  marginBottom: 0,
  backgroundColor: "$red100",
  color: "$white",
  borderRadius: "$medium",
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
  color: "$blueGrey900",
  justifyContent: "center",
});

const TitleText = styled("span", {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});
