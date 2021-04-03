import { FunctionComponent, StrictMode, Suspense } from "react";
import { queryClient } from "logic/queryClient";
import { QueryClientProvider } from "react-query";
import { Connect } from "./Connect";
import { BrowserRouter as Router } from "react-router-dom";
import { OverlayProvider } from "react-oot";
import { LoadingView } from "./LoadingView";
// import { ReactQueryDevtools } from "react-query/devtools";

export const Root: FunctionComponent = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Router>
          <OverlayProvider>
            <Suspense fallback={<LoadingView />}>
              <Connect />
              {/* <ReactQueryDevtools /> */}
            </Suspense>
          </OverlayProvider>
        </Router>
      </QueryClientProvider>
    </StrictMode>
  );
};
