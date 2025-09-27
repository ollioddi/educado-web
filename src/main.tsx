import "./index.css";

import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import { routeTree } from "./routeTree.gen";
import { configureApiClient } from "./shared/config/api-config";

import type { AuthContextType } from "./shared/hooks/use-auth.ts";
import "./i18n/i18n.ts";

// Configure the API client with environment variables
configureApiClient();

export const queryClient = new QueryClient();
export type AppRouter = typeof router;

export interface AppContext {
  queryClient: QueryClient;
  auth: AuthContextType | undefined;
}

// Query and auth is passed, so they're available in loaders and beforeLoad functions.
const router = createRouter({
  routeTree,
  context: {
    queryClient,
    auth: undefined, // Will be set by AuthProvider
  } as AppContext,
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root");
if (rootElement && rootElement.innerHTML === "") {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App queryClient={queryClient} router={router} />);
}
