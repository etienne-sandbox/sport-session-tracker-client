import { Spacer } from "components/Spacer";
import { memo } from "react";
import { Link } from "react-router-dom";
import { styled } from "stitches.config";
import { Layout } from "./Layout";

export const NotFound = memo(() => {
  return (
    <Layout
      content={
        <Wrapper>
          <h3>Page not found</h3>
          <Spacer vertical={4} />
          <p>
            <Link to="/">Go back home</Link>
          </p>
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
