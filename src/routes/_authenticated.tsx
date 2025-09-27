/* eslint-disable @typescript-eslint/only-throw-error */
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  component: Outlet,
  beforeLoad: ({ context: { auth } }) => {
    const isAuthenticated = auth?.isAuthenticated ?? false;

    if (!isAuthenticated) throw redirect({ to: "/login" });
  },
});
