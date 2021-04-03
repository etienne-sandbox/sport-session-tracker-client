import { User } from "logic/api";
import { createContext, useContext } from "react";

export const MeContext = createContext<User | null>(null);

export function useMe(): User | null {
  const me = useContext(MeContext);
  return me;
}

export function useMeOrThrow(): User {
  const me = useMe();
  if (me === null) {
    throw new Error("Missing Me context");
  }
  return me;
}
