import { memo } from "react";
import { Header } from "components/Header";
import { styled } from "stitches.config";

type Props = {
  content: React.ReactNode | null;
  header?: React.ReactNode | null;
};

export const Layout = memo<Props>(({ content, header = <Header /> }) => {
  return (
    <AppWrapper>
      {header}
      {content}
    </AppWrapper>
  );
});

const AppWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  alignSelf: "center",
  backgroundColor: "$white",
  borderRadius: "$big",
  maxHeight: 900,
  height: `calc(100% - 24px)`,
  maxWidth: 900,
  width: `calc(100% - 24px)`,
  boxShadow: "$soft",
});
