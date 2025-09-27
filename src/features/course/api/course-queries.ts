import { queryOptions } from "@tanstack/react-query";

import { CourseService } from "@/shared/api/services/CourseService";

export const courseKey = (courseId: string) => ['courses', courseId] as const;

export const courseQueryOptions = (courseId: string, staleTime?: number) =>
    queryOptions({
        queryKey: courseKey(courseId),
        queryFn: () => CourseService.courseGetCoursesById(
            courseId,
            undefined,
            ["cover_image", "course_categories", "authors", "course_sections"]
        ),
        staleTime,
    });