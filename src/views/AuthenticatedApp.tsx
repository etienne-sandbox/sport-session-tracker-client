import { Fetcher, User } from "logic/api";
import { createElement, memo, ReactElement, Suspense } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { MeContext } from "hooks/useMe";
import { LogoutContext } from "hooks/useLogout";
import { AuthFetcherContext } from "hooks/useAuthFetcher";
import { LoadingView } from "./LoadingView";
import { lazyMulti } from "logic/Utils";

type Props = {
  me: User;
  logout: () => void;
  authFetcher: Fetcher;
  commonRoutes: Array<ReactElement>;
};

const Lazy = lazyMulti({
  CreateWorkout: () => import("./CreateWorkout"),
  CreatePlace: () => import("./CreatePlace"),
});

export const AuthenticatedApp = memo<Props>(
  ({ me, logout, authFetcher, commonRoutes }) => {
    return (
      <LogoutContext.Provider value={logout}>
        <AuthFetcherContext.Provider value={authFetcher}>
          <MeContext.Provider value={me}>
            <Suspense fallback={<LoadingView />}>
              {createElement(
                Switch,
                null,
                <Route
                  path="/create-workout"
                  exact
                  render={() => <Lazy.CreateWorkout />}
                />,
                <Route
                  path="/create-place"
                  exact
                  render={() => <Lazy.CreatePlace />}
                />,
                <Redirect from="/signup" exact to="/" />,
                <Redirect from="/login" exact to="/" />,
                ...commonRoutes
              )}
            </Suspense>
          </MeContext.Provider>
        </AuthFetcherContext.Provider>
      </LogoutContext.Provider>
    );
  }
);
