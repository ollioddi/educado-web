import { useRouter } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import type { ApiCourseCourseDocument } from "@/shared/api/models/ApiCourseCourseDocument";
import { CourseService } from "@/shared/api/services/CourseService";
import { DataDisplay } from "@/shared/data-display/data-display";

import CourseCard from "../components/course-card";
import { createCourseColumns } from "../lib/courses-columns";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
const getCourses = CourseService.courseGetCourses.bind(CourseService) as any;

const CoursesOverviewPage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const courseColumns = createCourseColumns({ t, router });

  const renderCourseCard = (course: ApiCourseCourseDocument) => (
    <CourseCard course={course} />
  );

  return (
    <div className="flex flex-col gap-4">
      <p>Courses Overview Page</p>
      <DataDisplay
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        queryFn={getCourses}
        queryKey={["courses"]}
        columns={courseColumns}
        gridItemRender={renderCourseCard}
        fields={["title", "level", "description", "publishedAt"]}
        populate={["cover_image", "course_categories"]}
        initialPageSize={20}
        config={{
          overrideRenderMode: "auto",
          overrideClientModeThreshold: 50,
        }}
      />
    </div>
  );
};

export default CoursesOverviewPage;
