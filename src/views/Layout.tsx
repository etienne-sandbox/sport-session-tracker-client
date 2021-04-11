import { Fragment, memo } from "react";
import { styled } from "stitches.config";
import { Spacer } from "components/Spacer";
import { Colors } from "logic/Colors";
import { MainHeader } from "components/MainHeader";

type Props = {
  content: React.ReactNode | null;
  header?: React.ReactNode | null;
  footer?: React.ReactNode | null;
  leftMenu?: React.ReactNode | null;
};

export const Layout = memo<Props>(
  ({ content, header = <MainHeader />, footer = null, leftMenu = null }) => {
    return (
      <AppWrapper>
        {header}
        <Spacer vertical={4} />
        <Main>
          {leftMenu && (
            <Fragment>
              {leftMenu}
              <Spacer horizontal={4} />
            </Fragment>
          )}
          <Content>
            <ContentMain>{content}</ContentMain>
            {footer && (
              <Fragment>
                <Spacer vertical={4} />
                {footer}
              </Fragment>
            )}
          </Content>
        </Main>
      </AppWrapper>
    );
  }
);

const Main = styled("div", {
  flex: 1,
  display: "flex",
  flexDirection: "row",
  alignItems: "stretch",
  overflow: "hidden",
});

const Content = styled("div", {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  overflow: "hidden",
});

const ContentMain = styled("div", {
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
