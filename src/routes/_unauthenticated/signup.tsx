import { createFileRoute } from "@tanstack/react-router";

const SignupPage = () => {
  return <div>Signup Page</div>;
};

export const Route = createFileRoute("/_unauthenticated/signup")({
  component: SignupPage,
});
