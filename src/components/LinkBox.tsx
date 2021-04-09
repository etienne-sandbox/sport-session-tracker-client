import { Colors } from "logic/Colors";
import { Link } from "react-router-dom";
import { styled } from "stitches.config";

export const LinkBox = styled(Link, {
  display: "block",
  textDecoration: "none",
  color: Colors.grey(900),
});
