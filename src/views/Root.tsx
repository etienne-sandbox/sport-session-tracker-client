import { FunctionComponent, StrictMode, Suspense } from "react";
import { queryClient } from "logic/queryClient";
import { QueryClientProvider } from "react-query";
import { Connect } from "./Connect";
import { BrowserRouter as Router } from "react-router-dom";
import { OverlayProvider } from "react-oot";
import { LoadingView } from "./LoadingView";
import { positions, Provider as AlertProvider } from "react-alert";
import { AlertTemplate } from "./AlertTemplate";

export const Root: FunctionComponent = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Router>
          <OverlayProvider>
            <AlertProvider
              template={AlertTemplate}
              timeout={5000}
              position={positions.TOP_CENTER}
              containerStyle={{
                marginBottom: 16,
              }}
            >
              <Suspense fallback={<LoadingView />}>
                <Connect />
              </Suspense>
            </AlertProvider>
          </OverlayProvider>
        </Router>
      </QueryClientProvider>
    </StrictMode>
  );
};
