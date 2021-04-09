import { Colors } from "logic/Colors";
import { styled } from "stitches.config";

export const FooterWrapper = styled("header", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  textAlign: "center",
  minHeight: "$22",
  marginBottom: 0,
  backgroundColor: Colors.white,
  boxShadow: "$soft",
  borderRadius: "$big",
  paddingLeft: "$02",
  paddingRight: "$02",
});
