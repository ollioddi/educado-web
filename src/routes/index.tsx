/* eslint-disable @typescript-eslint/only-throw-error */
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: ({ context: { auth } }) => {
    if (!auth?.isAuthenticated) throw redirect({ to: "/login" });
    if (auth.isRole("admin")) {
      throw redirect({ to: "/admin-dashboard" });
    }
    throw redirect({ to: "/courses" });
  },
});
