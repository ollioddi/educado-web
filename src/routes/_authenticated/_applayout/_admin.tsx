/* eslint-disable @typescript-eslint/only-throw-error */

import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_applayout/_admin")({
  component: Outlet,
  beforeLoad: ({ context: { auth } }) => {
    const isAdmin = auth?.isRole("admin") ?? false;

    if (!isAdmin) throw redirect({ to: "/login" });
  },
});
