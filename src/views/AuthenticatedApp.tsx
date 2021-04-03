import { Fetcher, User } from "logic/api";
import { createElement, lazy, memo, ReactElement } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { MeContext } from "hooks/useMe";
import { LogoutContext } from "hooks/useLogout";
import { AuthFetcherContext } from "hooks/useAuthFetcher";

type Props = {
  me: User;
  logout: () => void;
  authFetcher: Fetcher;
  commonRoutes: Array<ReactElement>;
};

const AsyncNewWorkout = lazy(() =>
  import("./NewWorkout").then((m) => ({ default: m.NewWorkout }))
);

export const AuthenticatedApp = memo<Props>(
  ({ me, logout, authFetcher, commonRoutes }) => {
    return (
      <LogoutContext.Provider value={logout}>
        <AuthFetcherContext.Provider value={authFetcher}>
          <MeContext.Provider value={me}>
            {createElement(
              Switch,
              null,
              <Route
                path="/new-workout"
                exact
                render={() => <AsyncNewWorkout />}
              />,
              <Redirect from="/signup" exact to="/" />,
              <Redirect from="/login" exact to="/" />,
              ...commonRoutes
            )}
          </MeContext.Provider>
        </AuthFetcherContext.Provider>
      </LogoutContext.Provider>
    );
  }
);
