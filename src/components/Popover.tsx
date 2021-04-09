import { Colors } from "logic/Colors";
import { styled } from "stitches.config";

export const Popover = styled("div", {
  borderRadius: "$medium",
  margin: 0,
  border: "none",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  backgroundColor: Colors.white,
  boxShadow: "$overlay",
  padding: "$04",
});
