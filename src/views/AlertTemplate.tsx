import { FunctionComponent } from "react";
import { Info, CheckCircle, WarningCircle, X } from "phosphor-react";
import { AlertComponentPropsWithStyle } from "react-alert";
import { styled } from "stitches.config";
import { Colors } from "logic/Colors";

export const AlertTemplate: FunctionComponent<AlertComponentPropsWithStyle> = ({
  message,
  options,
  style,
  close,
}) => {
  return (
    <Alert style={style}>
      <Icon>
        {options.type === "info" && <Info size={32} color="#64B5F6" />}
        {options.type === "success" && (
          <CheckCircle size={32} color="#81C784" />
        )}
        {options.type === "error" && (
          <WarningCircle size={32} color="#E57373" />
        )}
      </Icon>
      <span style={{ flex: 2 }}>{message}</span>
      <Button onClick={close}>
        <X size={32} />
      </Button>
    </Alert>
  );
};

const Alert = styled("div", {
  backgroundColor: Colors.blueGrey(900),
  color: "white",
  padding: "$04 $06",
  borderRadius: "$medium",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0px 2px 2px 2px rgba(0, 0, 0, 0.03)",
  fontFamily: "$spaceGrotesk",
  fontHeight: "$11",
  boxSizing: "border-box",
  maxWidth: "calc(100vw - 20px)",
});

const Button = styled("button", {
  marginLeft: "$06",
  border: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
  color: Colors.white,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Icon = styled("div", {
  marginRight: "$06",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
