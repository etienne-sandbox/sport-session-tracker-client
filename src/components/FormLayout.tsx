import { memo } from "react";
import { styled } from "stitches.config";
import { Title } from "components/Title";
import { ScrollFlex } from "./ScrollFlex";
import { Spacer } from "./Spacer";

type Props = {
  title: string;
  children: JSX.Element | Array<JSX.Element>;
};

export const FormLayout = memo<Props>(({ children, title }) => {
  return (
    <ScrollFlex direction="vertical">
      <Wrapper>
        <Spacer vertical={8} />
        <Title>{title}</Title>
        {children}
        <Spacer vertical={8} />
      </Wrapper>
    </ScrollFlex>
  );
});

const Wrapper = styled("div", {
  display: "flex",
  flex: "1",
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "center",
  paddingLeft: "$02",
  paddingRight: "$02",
  overflow: "hidden",
});
