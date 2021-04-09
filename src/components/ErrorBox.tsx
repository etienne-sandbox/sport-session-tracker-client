import { memo } from "react";
import { styled } from "stitches.config";
import Ky from "ky";
import { Colors } from "logic/Colors";

type Props = {
  error: unknown;
};

export const ErrorBox = memo<Props>(({ error }) => {
  if (error === null || error === undefined) {
    return <ErrorWrapper>Error</ErrorWrapper>;
  }
  if (typeof error === "string") {
    if (error.length > 40) {
      return (
        <ErrorWrapper>
          <ErrorTitle>Error</ErrorTitle>
          <ErrorDetails>{error}</ErrorDetails>
        </ErrorWrapper>
      );
    }
    return (
      <ErrorWrapper>
        <ErrorTitle>{error}</ErrorTitle>
      </ErrorWrapper>
    );
  }
  if (error instanceof Ky.HTTPError) {
    console.log(error.response);
    const parsed = (error.response as any).parsed;
    const message = parsed && parsed.message;
    return (
      <ErrorWrapper>
        <ErrorTitle>{error.message}</ErrorTitle>
        {message && <ErrorDetails>{message}</ErrorDetails>}
      </ErrorWrapper>
    );
  }
  if (error instanceof Error) {
    return (
      <ErrorWrapper>
        <ErrorTitle>{error.message}</ErrorTitle>
      </ErrorWrapper>
    );
  }
  return (
    <ErrorWrapper>
      <ErrorTitle>error</ErrorTitle>
    </ErrorWrapper>
  );
});

const ErrorWrapper = styled("div", {
  color: Colors.white,
  backgroundColor: Colors.red(500),
  fontHeight: "$06",
  paddingLeft: "$04",
  paddingRight: "$04",
  paddingTop: "$04",
  paddingBottom: "$04",
  borderRadius: "$medium",
});

const ErrorTitle = styled("h2", {
  fontHeight: "$12",
  margin: 0,
});

const ErrorDetails = styled("p", {
  fontHeight: "$10",
  margin: 0,
});
