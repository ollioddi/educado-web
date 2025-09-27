import { createFileRoute } from "@tanstack/react-router";

import CoursesOverviewPage from "@/course/pages/courses-overview-page";

export const Route = createFileRoute("/_authenticated/_applayout/courses/")({
  component: CoursesOverviewPage,
});
