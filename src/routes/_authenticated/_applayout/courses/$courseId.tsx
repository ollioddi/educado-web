/* eslint-disable unicorn/filename-case */
import { createFileRoute } from "@tanstack/react-router";

import CourseDetailsPage from "@/course/pages/course-details-page";

export const Route = createFileRoute(
  "/_authenticated/_applayout/courses/$courseId"
)({
  component: CourseDetailsPage,
});
