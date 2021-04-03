import { useAuth } from "hooks/useAuth";
import { lazyMulti } from "logic/Utils";
import { memo } from "react";
import { Route } from "react-router-dom";
import { AnonymousApp } from "./AnonymousApp";
import { AuthenticatedApp } from "./AuthenticatedApp";
import { LoadingView } from "./LoadingView";
import { NotFound } from "./NotFound";

const Lazy = lazyMulti({
  HomePage: () => import("./HomePage"),
  WorkoutPage: () => import("./WorkoutPage"),
  PlacesPage: () => import("./PlacesPage"),
  PlacePage: () => import("./PlacePage"),
  UserPage: () => import("./UserPage"),
});

console.log(Lazy);

export const App = memo(() => {
  const { loading, user, setToken, logout, authFetcher } = useAuth();

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
