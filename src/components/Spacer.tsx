import { memo } from "react";
import { styled, size } from "stitches.config";

type Size = number | [number, number];

type Props = {
  vertical?: Size;
  horizontal?: Size;
};

export const Spacer = memo<Props>(({ horizontal, vertical }) => {
  const style: React.CSSProperties = {};
  if (horizontal) {
    style.width = Array.isArray(horizontal)
      ? size(horizontal[0], horizontal[1])
      : size(0, horizontal);
  }
  if (vertical) {
    style.height = Array.isArray(vertical)
      ? size(vertical[0], vertical[1])
      : size(0, vertical);
  }
  return <Div style={style} />;
});

const Div = styled("div", {
  flexShrink: 0,
  alignSelf: "stretch",
});
