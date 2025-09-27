import { createFileRoute } from "@tanstack/react-router";

import LoginPage from "@/auth/pages/login-page";

export const Route = createFileRoute("/_unauthenticated/login")({
  component: LoginPage,
});
