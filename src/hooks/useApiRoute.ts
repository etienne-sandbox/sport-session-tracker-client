import { ApiRoute } from "logic/api";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { useAuthFetcherOrThrow } from "./useAuthFetcher";
import { useFetcherOrThrow } from "./useFetcher";

export function useApiRoute<Params, Result>(
  route: ApiRoute<Params, Result>,
  params: Params,
  options: UseQueryOptions<unknown, unknown, Result> = {}
): UseQueryResult<Result> {
  const fetcher = useFetcherOrThrow();
  return useQuery(
    route.getKey(params),
    () => route.queryFn(fetcher, params),
    options
  );
}

export function useAuthApiRoute<Params, Result>(
  route: ApiRoute<Params, Result>,
  params: Params,
  options: UseQueryOptions<unknown, unknown, Result>
): UseQueryResult<Result> {
  const fetcher = useAuthFetcherOrThrow();
  return useQuery(
    route.getKey(params),
    () => route.queryFn(fetcher, params),
    options
  );
}
