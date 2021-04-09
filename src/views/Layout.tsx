import { Fragment, memo } from "react";
import { Header } from "components/Header";
import { styled } from "stitches.config";
import { Spacer } from "components/Spacer";
import { Colors } from "logic/Colors";

type Props = {
  content: React.ReactNode | null;
  header?: React.ReactNode | null;
  footer?: React.ReactNode | null;
};

export const Layout = memo<Props>(
  ({ content, header = <Header />, footer = null }) => {
    return (
      <AppWrapper>
        {header}
        <Spacer vertical={4} />
        <Content>{content}</Content>
        {footer && (
          <Fragment>
            <Spacer vertical={4} />
            {footer}
          </Fragment>
        )}
      </AppWrapper>
    );
  }
);

const Content = styled("div", {
  backgroundColor: Colors.white,
  borderRadius: "$big",
  boxShadow: "$soft",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  overflow: "hidden",
});

const AppWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  alignSelf: "center",
  maxHeight: 900,
  height: `calc(100% - 24px)`,
  maxWidth: 900,
  width: `calc(100% - 24px)`,
});
