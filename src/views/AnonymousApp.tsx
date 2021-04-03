import { createElement, memo, ReactElement } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Login } from "./Login";
import { Signup } from "./Signup";

type Props = {
  setToken: (token: string) => void;
  commonRoutes: Array<ReactElement>;
};

export const AnonymousApp = memo<Props>(({ setToken, commonRoutes }) => {
  return createElement(
    Switch,
    null,
    <Route path="/login" exact render={() => <Login setToken={setToken} />} />,
    <Route
      path="/signup"
      exact
      render={() => <Signup setToken={setToken} />}
    />,
    <Redirect from="/new-workout" to="/login" />,
    ...commonRoutes
  );
});
