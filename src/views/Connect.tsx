import { memo, useMemo, useState } from "react";
import { LoadingView } from "./LoadingView";
import { App } from "./App";
import { createFetcher } from "logic/api";
import { useQuery } from "react-query";
import { ServerPortInput } from "./ServerPortInput";
import { FetcherContext } from "hooks/useFetcher";
import { useLocalStorage } from "hooks/useLocalStorage";

const PORT_STORAGE_KEY = `SPORT-SESSION-TRACKER_CLIENT_PORT_V1`;

export const Connect = memo(() => {
  const [port, setPort] = useLocalStorage(PORT_STORAGE_KEY, "3001");
  const [connectFail, setConectFail] = useState(false);

  const portResolved = port ?? "3001";

  const fetcher = useMemo(() => createFetcher(portResolved), [portResolved]);

  const { status, refetch, isFetching } = useQuery(
    ["api", port],
    () => fetcher.get(""),
    {
      retry: false,
      onError: () => {
        setConectFail(true);
      },
    }
  );

  if (status === "success") {
    return (
      <FetcherContext.Provider value={fetcher}>
        <App />
      </FetcherContext.Provider>
    );
  }

  if (status === "loading" && connectFail === false) {
    return <LoadingView />;
  }

  return (
    <ServerPortInput
      key={portResolved}
      onChange={(port) => {
        setPort(port);
        refetch();
      }}
      initialPort={portResolved}
      isFetching={isFetching}
    />
  );
});
