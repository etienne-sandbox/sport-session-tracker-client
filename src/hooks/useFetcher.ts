import { Fetcher } from "logic/api";
import { createContext, useContext } from "react";

export const FetcherContext = createContext<Fetcher | null>(null);

export function useFetcher(): Fetcher | null {
  const fetcher = useContext(FetcherContext);
  return fetcher;
}

export function useFetcherOrThrow(): Fetcher {
  const fetcher = useFetcher();
  if (fetcher === null) {
    throw new Error("Missing Fetcher context");
  }
  return fetcher;
}
