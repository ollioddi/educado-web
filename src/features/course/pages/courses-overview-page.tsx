import { useRouter } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import type { ApiCourseCourseDocument } from "@/shared/api/models/ApiCourseCourseDocument";
import { CourseService } from "@/shared/api/services/CourseService";
import JsonCard from "@/shared/components/json-card";
import { DataDisplay } from "@/shared/data-display/data-display";
import usePaginatedData from "@/shared/hooks/use-paginated-data";

import CourseCard from "../components/course-card";
import { createCourseColumns } from "../lib/courses-columns";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
const getCourses = CourseService.courseGetCourses.bind(CourseService) as any;

const CoursesOverviewPage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const { data } = usePaginatedData<ApiCourseCourseDocument>({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    queryFn: getCourses,
    queryKey: ["courses"],
    fields: ["title", "level", "description", "publishedAt"],
    populate: ["cover_image", "course_categories"],
    initialPageSize: 20,
    config: {
      overrideRenderMode: "auto", // Will auto-detect based on total items
      overrideClientModeThreshold: 50, // Switch to client mode if <= 50 items
    },
  });

  const courseColumns = createCourseColumns({ t, router });

  const renderCourseCard = (course: ApiCourseCourseDocument) => (
    <CourseCard course={course} />
  );

  return (
    <div className="flex flex-col gap-4">
      <p>Courses Overview Page</p>
      <p>Data length: {data.length}</p>
      <JsonCard object={data} />
      <DataDisplay
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        queryFn={getCourses}
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
