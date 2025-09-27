import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { StrictMode, Suspense } from "react";

import { ErrorBoundary } from "@/shared/components/error-boundary";
import LoadingPage from "@/shared/components/loading-page";
import { Toaster } from "@/shared/components/shadcn/sonner";
import { AuthProvider } from "@/shared/context/auth-provider";
import { useAuth } from "@/shared/hooks/use-auth";

import type { AppRouter } from "./main";

// Context and hooks cannot be loaded in main App, because they can only be used as a child of their providers
const InnerApp = ({ router }: { router: AppProperties["router"] }) => {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
};
interface AppProperties {
  queryClient: QueryClient;
  router: AppRouter;
}
const App = ({ queryClient, router }: AppProperties) => {
  return (
    <StrictMode>
      <AuthProvider router={router}>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<LoadingPage />}>
            <ErrorBoundary>
              <InnerApp router={router} />
              <Toaster />
            </ErrorBoundary>
          </Suspense>
        </QueryClientProvider>
      </AuthProvider>
    </StrictMode>
  );
};

export default App;
