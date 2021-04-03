import { Fetcher } from "logic/api";
import { createContext, useContext } from "react";

export const AuthFetcherContext = createContext<Fetcher | null>(null);

export function useAuthFetcher(): Fetcher | null {
  const authFetcher = useContext(AuthFetcherContext);
  return authFetcher;
}

export function useAuthFetcherOrThrow(): Fetcher {
  const authFetcher = useAuthFetcher();
  if (authFetcher === null) {
    throw new Error("Missing AuthFetcher context");
  }
  return authFetcher;
}
