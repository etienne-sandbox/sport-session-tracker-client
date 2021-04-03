import { createContext, useContext } from "react";

type Logout = () => void;

export const LogoutContext = createContext<Logout | null>(null);

export function useLogout(): Logout | null {
  const logout = useContext(LogoutContext);
  return logout;
}

export function useLogoutOrThrow(): Logout {
  const logout = useLogout();
  if (logout === null) {
    throw new Error("Missing Logout context");
  }
  return logout;
}
