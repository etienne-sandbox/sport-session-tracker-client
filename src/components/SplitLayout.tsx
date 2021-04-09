import { memo } from "react";
import { styled } from "stitches.config";

type Props = {
  content: React.ReactNode | null;
  side?: React.ReactNode | null;
};

export const SplitLayout = memo<Props>(({ content, side }) => {
  return (
    <Wrapper>
      {side}
      <Content>{content}</Content>
    </Wrapper>
  );
});

const Content = styled("div", {
  flex: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  overflow: "hidden",
});

const Wrapper = styled("div", {
  flex: 1,
  height: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "stretch",
  overflow: "hidden",
});
