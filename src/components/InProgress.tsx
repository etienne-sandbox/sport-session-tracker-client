import { Colors } from "logic/Colors";
import { Wrench } from "phosphor-react";
import { memo } from "react";
import { size, styled, keyframes } from "stitches.config";
import { Spacer } from "./Spacer";

export const InProgress = memo(() => {
  return (
    <Wrapper>
      <Icon>
        <Wrench size={size(4, 0)} weight="duotone" color={Colors.indigo(500)} />
      </Icon>
      <Spacer vertical={8} />
      <Text>Comming soon...</Text>
    </Wrapper>
  );
});

const spinningAnim = keyframes({
  "0%": { transform: "translateY(0)" },
  "5%": { transform: "translateY(0)" },
  "15%": { transform: "translateY(-20px)" },
  "25%": { transform: "translateY(0)" },
  "100%": { transform: "translateY(0)" },
});

const Icon = styled("div", {
  animation: `${spinningAnim} 4s infinite`,
});

const Wrapper = styled("div", {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const Text = styled("p", {
  fontHeight: "$14",
});
