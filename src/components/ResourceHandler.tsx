import { QueryObserverResult } from "react-query";
import { ErrorBox } from "./ErrorBox";

type Props<TResult, TError> = {
  resource: QueryObserverResult<TResult, TError>;
  renderResolved?: (data: TResult, updating: boolean) => JSX.Element | null;
  renderPending?: () => JSX.Element | null;
  renderRejected?: (error: TError, updating: boolean) => JSX.Element | null;
};

export function ResourceHandler<TResult, TError>({
  resource,
  renderResolved,
  renderPending,
  renderRejected,
}: Props<TResult, TError>): JSX.Element | null {
  const { status, isFetching, data, error } = resource;
  if (status === "error") {
    if (renderRejected) {
      return renderRejected(error as any, isFetching);
    }
    return <ErrorBox error={error} />;
  }

  if (status === "success") {
    if (renderResolved) {
      return renderResolved(data as any, isFetching);
    }
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
  }

  if (status === "loading") {
    if (renderPending) {
      return renderPending();
    }
    return null;
  }

  return null;
}
