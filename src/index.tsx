import { render } from "react-dom";
import "./index.css";
import { Root } from "./views/Root";
import reportWebVitals from "./reportWebVitals";

render(<Root />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
