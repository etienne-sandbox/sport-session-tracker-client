import { Colors } from "logic/Colors";
import { memo } from "react";
import { styled } from "stitches.config";

type Props = {
  title?: string;
  info: JSX.Element | string;
};

export const InfoBox = memo<Props>(({ info, title }) => {
  return (
    <InfoWrapper>
      {title && <InfoTitle>{title}</InfoTitle>}
      <InfoDetails>{info}</InfoDetails>
    </InfoWrapper>
  );
});

const InfoWrapper = styled("div", {
  color: Colors.white,
  backgroundColor: Colors.blue(600),
  fontHeight: "$06",
  paddingLeft: "$04",
  paddingRight: "$04",
  paddingTop: "$04",
  paddingBottom: "$04",
  borderRadius: "$medium",
  a: {
    color: Colors.white,
  },
});

const InfoTitle = styled("h2", {
  fontHeight: "$12",
  margin: 0,
});

const InfoDetails = styled("p", {
  fontHeight: "$10",
  margin: 0,
});
