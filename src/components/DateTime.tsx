import { memo } from "react";
import { format, parseISO } from "date-fns";
import { styled } from "stitches.config";

type Props = {
  datetime: string;
};

export const DateTime = memo<Props>(({ datetime }) => {
  const date = parseISO(datetime);
  return (
    <Wrapper>
      {format(date, "EEEE d LLL yyyy")} at {format(date, "HH:mm")}
    </Wrapper>
  );
});

const Wrapper = styled("span", {
  fontWeight: "$400",
  fontHeight: "$11",
});
