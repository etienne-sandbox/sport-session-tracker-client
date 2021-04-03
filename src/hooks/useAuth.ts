import { Fetcher, createAuthFetcher, getMe, User } from "logic/api";
import { useCallback, useMemo } from "react";
import { useQuery } from "react-query";
import { useFetcherOrThrow } from "./useFetcher";
import { useLocalStorage } from "./useLocalStorage";

const TOKEN_STORAGE_KEY = `TODO_MULTI_USER_CLIENT_TOKEN_V1`;

export type AuthResult = {
  loading: boolean;
  user: User | null;
  setToken: (token: string) => void;
  logout: () => void;
  authFetcher: Fetcher | null;
};

export function useAuth(): AuthResult {
  // const queryClient = useQueryClient();

  const fetcher = useFetcherOrThrow();

  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_KEY);

  const logout = useCallback(() => {
    setToken(null);
    window.setTimeout(() => {
      window.location.reload();
    }, 100);
  }, [setToken]);

  const authFetcher = useMemo(
    () => (token ? createAuthFetcher(fetcher, token) : null),
    [fetcher, token]
  );

  const getMeResolved = useCallback(
    () => (authFetcher ? getMe.queryFn(authFetcher) : null),
    [authFetcher]
  );

  const me = useQuery(["me", token], getMeResolved, {
    onError: () => {
      console.log("oops");

      setToken(null);
    },
    retry: false,
  });

  // useEffect(() => {
  //   queryClient.removeQueries();
  // }, [token, queryClient]);

  return {
    loading: me.isLoading,
    user: me.data ?? null,
    setToken,
    authFetcher,
    logout,
  };
}
