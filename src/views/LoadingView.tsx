import { FunctionComponent, memo } from "react";
import { Loader } from "components/Loader";
import { styled } from "stitches.config";
import { Layout } from "./Layout";

export const LoadingView: FunctionComponent = memo(() => {
  return (
    <Layout
      content={
        <Wrapper>
          <Loader size={30} />
        </Wrapper>
      }
    />
  );
});

const Wrapper = styled("div", {
  textAlign: "center",
  flex: 1,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});
