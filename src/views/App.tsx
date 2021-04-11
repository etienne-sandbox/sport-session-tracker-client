import { useAuth } from "hooks/useAuth";
import { usePreviousLocation } from "hooks/usePreviousLocation";
import { lazyMulti } from "logic/Utils";
import { memo, useEffect, useRef } from "react";
import { Route, useHistory } from "react-router-dom";
import { AnonymousApp } from "./AnonymousApp";
import { AuthenticatedApp } from "./AuthenticatedApp";
import { LoadingView } from "./LoadingView";
import { NotFound } from "./NotFound";
import { Location } from "history";

const Lazy = lazyMulti({
  HomePage: () => import("./HomePage"),
  WorkoutPage: () => import("./WorkoutPage"),
  PlacesPage: () => import("./PlacesPage"),
  UsersPage: () => import("./UsersPage"),
  PlacePage: () => import("./PlacePage"),
  UserPage: () => import("./UserPage"),
});

export const App = memo(() => {
  const { loading, user, setToken, logout, authFetcher } = useAuth();
  const setPreviousLocation = usePreviousLocation((s) => s.setPreviousLocation);

  const history = useHistory();

  const previousLocationRef = useRef<Location | null>(null);

  useEffect(() => {
    return history.listen((location) => {
      if (previousLocationRef.current) {
        setPreviousLocation(previousLocationRef.current);
      }
      previousLocationRef.current = location;
    });
  }, [history, setPreviousLocation]);

  if (loading) {
    return <LoadingView />;
  }

  const commonRoutes = [
    <Route path="/" exact render={() => <Lazy.HomePage />} />,
    <Route
      path="/workout/:workoutId"
      exact
      render={({ match }) => (
        <Lazy.WorkoutPage workoutId={match.params.workoutId} />
      )}
    />,
    <Route path="/places" exact render={() => <Lazy.PlacesPage />} />,
    <Route path="/users" exact render={() => <Lazy.UsersPage />} />,
    <Route
      path="/place/:placeSlug"
      exact
      render={({ match }) => (
        <Lazy.PlacePage placeSlug={match.params.placeSlug} />
      )}
    />,
    <Route
      path="/user/:username"
      exact
      render={({ match }) => <Lazy.UserPage username={match.params.username} />}
    />,
    <Route render={() => <NotFound />} />,
  ];

  if (user === null || authFetcher === null) {
    return <AnonymousApp setToken={setToken} commonRoutes={commonRoutes} />;
  }
  return (
    <AuthenticatedApp
      me={user}
      logout={logout}
      authFetcher={authFetcher}
      commonRoutes={commonRoutes}
    />
  );
});
