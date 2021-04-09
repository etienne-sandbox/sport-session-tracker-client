import { memo } from "react";
import { styled } from "stitches.config";

type Props = {
  duration: number;
};

export const Duration = memo<Props>(({ duration }) => {
  if (duration < 60) {
    return (
      <Wrapper>
        <Num>{duration.toFixed(0)}</Num>
        <Unit>min</Unit>
      </Wrapper>
    );
  }
  const hours = (duration / 60).toFixed(0);
  const mins = (duration % 60).toFixed(0).padStart(2, "0");
  return (
    <Wrapper>
      <Num>{hours}</Num>
      <Unit>h</Unit> <Num>{mins}</Num>
      <Unit>min</Unit>
    </Wrapper>
  );
});

const Wrapper = styled("span", {
  fontWeight: "$700",
  fontHeight: "$12",
  textAlign: "right",
  display: "inline-block",
});

const Num = styled("span", {});

const Unit = styled("span", {
  fontWeight: "$600",
  fontHeight: "$10",
});
