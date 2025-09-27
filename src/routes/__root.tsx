import { TanstackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import type { AppContext } from "src/main";

const RootComponent = () => (
  <div className="flex flex-col h-screen bg-background">
    <Outlet />
    <TanstackDevtools
      plugins={[
        {
          name: "TanStack Query",
          render: <ReactQueryDevtoolsPanel />,
        },
        {
          name: "TanStack Router",
          render: <TanStackRouterDevtoolsPanel />,
        },
      ]}
    />
  </div>
);

export const Route = createRootRouteWithContext<AppContext>()({
  component: RootComponent,
});
