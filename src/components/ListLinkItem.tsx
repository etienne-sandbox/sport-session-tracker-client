import { memo } from "react";
import { css, styled } from "stitches.config";
import { Asterisk } from "phosphor-react";
import { LinkBox } from "./LinkBox";
import { Spacer } from "components/Spacer";

type Props = {
  id: string;
  name: string;
};

export const ListLinkItem = memo<Props>(({ id, name }) => {
  return (
    <LinkBox to={`/list/${id}`}>
      <Wrapper>
        <Asterisk size={20} className={noFlexShrink()} />
        <Spacer horizontal={4} />
        <Name>{name}</Name>
      </Wrapper>
    </LinkBox>
  );
});

const Name = styled("p", {
  fontHeight: "$12",
  textAlign: "left",
});

const noFlexShrink = css({ flexShrink: 0 });

const Wrapper = styled("div", {
  display: "flex",
  alignItems: "center",
  borderRadius: "$medium",
  paddingLeft: "$04",
  paddingTop: "$02",
  paddingBottom: "$02",
  backgroundColor: "$transparentBlue",
  "&:hover": {
    backgroundColor: "$blue500",
    color: "$white",
  },
});
