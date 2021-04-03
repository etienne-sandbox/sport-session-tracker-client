import { memo } from "react";
import { styled } from "stitches.config";

type Props = {
  distance: number;
};

export const Distance = memo<Props>(({ distance }) => {
  if (distance < 1000) {
    return (
      <Wrapper>
        <Num>
          <Small>{distance.toFixed(0)}</Small>
        </Num>{" "}
        <Unit>m</Unit>
      </Wrapper>
    );
  }
  const num = (distance / 1000).toFixed(2);
  const [kms, m] = num.split(".");
  return (
    <Wrapper>
      <Num>
        {kms}
        <Small>,{m}</Small>
      </Num>{" "}
      <Unit>km</Unit>
    </Wrapper>
  );
});

const Wrapper = styled("span", {
  fontWeight: "$700",
  fontHeight: "$12",
});

const Num = styled("span", {
  display: "inline-block",
  minWidth: "$24",
  textAlign: "right",
});

const Small = styled("span", {
  fontWeight: "$400",
  fontHeight: "$12",
});

const Unit = styled("span", {
  fontWeight: "$600",
  fontHeight: "$10",
});
