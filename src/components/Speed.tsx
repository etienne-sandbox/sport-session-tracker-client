import { memo } from "react";
import { styled } from "stitches.config";

type Props = {
  speed: number;
};

export const Speed = memo<Props>(({ speed }) => {
  const num = speed.toFixed(2);
  const [kms, m] = num.split(".");
  return (
    <Wrapper>
      <Num>
        {kms}
        <Small>,{m}</Small>
      </Num>{" "}
      <Unit>km/h</Unit>
    </Wrapper>
  );
});

const Wrapper = styled("span", {
  fontWeight: "$700",
  fontHeight: "$12",
});

const Num = styled("span", {
  display: "inline-block",
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
