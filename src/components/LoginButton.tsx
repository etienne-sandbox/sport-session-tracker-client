import { User } from "phosphor-react";
import { memo } from "react";
import { Button } from "./Button";
import { useLoggedInRedirectStore } from "hooks/useLoggedInRedirect";
import { useHistory } from "react-router";

export const LoginButton = memo(() => {
  const setRedirect = useLoggedInRedirectStore((s) => s.setRedirect);
  const history = useHistory();

  return (
    <Button
      to="/login"
      text="Login"
      leftIcon={<User />}
      onClick={() => {
        setRedirect(history.location);
      }}
    />
  );
});
