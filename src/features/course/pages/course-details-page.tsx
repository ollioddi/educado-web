import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Users,
  User,
  Star,
  Award,
  Calendar,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import { Badge } from "@/shared/components/shadcn/badge";
import { Button } from "@/shared/components/shadcn/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/shadcn/card";
import { Separator } from "@/shared/components/shadcn/separator";

import { courseQueryOptions } from "../api/course-queries";
import CategoryBadges from "../components/category-badges";

const CourseDetailsPage = () => {
  const { t } = useTranslation();
  const { courseId } = useParams({
    from: "/_authenticated/_applayout/courses/$courseId",
  });
  const router = useRouter();

  const { data: course } = useSuspenseQuery(courseQueryOptions(courseId));

  const handleNavigateBack = () => {
    void router.navigate({ to: "/courses" });
  };

  return (
    <div className="min-h-screen bg-[#fdfeff] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={handleNavigateBack}
          className="mb-6 text-[#35a1b1] hover:text-[#246670]"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to courses
        </Button>

        {/* Main course details card */}
        <Card className="border-[#c1cfd7] shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#35a1b1]/10 rounded-lg">
                  <BookOpen className="h-8 w-8 text-[#35a1b1]" />
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-2xl font-bold text-[#383838]">
                    {course.data.title}
                  </CardTitle>
                  <div className="flex items-center gap-3">
                    {course.data.course_categories &&
                      CategoryBadges({
                        categories: course.data.course_categories,
                      })}
                    <Badge
                      variant="outline"
                      className="border-[#35a1b1] text-[#35a1b1]"
                    >
                      <Award className="h-3 w-3 mr-1" />
                      {course.data.level}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-[#f1cc4f] text-[#f1cc4f]" />
                <span className="text-[#f1cc4f] font-semibold text-lg">
                  4.2
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Course stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-[#fdfeff] border border-[#c1cfd7] rounded-lg">
                <Clock className="h-5 w-5 text-[#35a1b1]" />
                <div>
                  <p className="text-sm text-[#809cad]">Duration</p>
                  <p className="font-semibold text-[#383838]">8 hours</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-[#fdfeff] border border-[#c1cfd7] rounded-lg">
                <Users className="h-5 w-5 text-[#35a1b1]" />
                <div>
                  <p className="text-sm text-[#809cad]">Students enrolled</p>
                  <p className="font-semibold text-[#383838]">156 students</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-[#fdfeff] border border-[#c1cfd7] rounded-lg">
                <User className="h-5 w-5 text-[#35a1b1]" />
                <div>
                  <p className="text-sm text-[#809cad]">Instructor</p>
                  <p className="font-semibold text-[#383838]">
                    {course.data.authors?.[0]?.username ?? "Unknown"}
                  </p>
                </div>
              </div>
            </div>

            <Separator className="bg-[#c1cfd7]" />

            {/* Course description */}
            <div>
              <h3 className="text-lg font-semibold text-[#383838] mb-3">
                Course Description
              </h3>
              <div className="text-[#4e6879] leading-relaxed">
                {/* TODO: Render rich text description properly */}
                This is a comprehensive course that will teach you everything
                you need to know.
              </div>
            </div>

            {/* Course sections placeholder */}
            {course.data.course_sections &&
              course.data.course_sections.length > 0 && (
                <>
                  <Separator className="bg-[#c1cfd7]" />
                  <div>
                    <h3 className="text-lg font-semibold text-[#383838] mb-3">
                      Course Sections
                    </h3>
                    <div className="space-y-2">
                      {course.data.course_sections.map((section) => (
                        <div
                          key={section.id}
                          className="p-3 border border-[#c1cfd7] rounded-lg"
                        >
                          <p className="font-medium text-[#383838]">
                            {section.title}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

            {/* Course info */}
            <Separator className="bg-[#c1cfd7]" />
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-[#35a1b1]" />
              <div>
                <p className="text-sm text-[#809cad]">Published</p>
                <p className="font-semibold text-[#383838]">
                  {new Date(course.data.publishedAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-4">
              <Button className="bg-[#35a1b1] hover:bg-[#246670] text-white flex-1">
                Enroll in Course
              </Button>
              <Button
                variant="outline"
                className="border-[#35a1b1] text-[#35a1b1] hover:bg-[#35a1b1] hover:text-white bg-transparent"
              >
                {t("common.edit")} Course
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Space for future sections */}
        <div className="mt-8">
          {/* This space is reserved for future sections like:
              - Course curriculum/modules  
              - Student reviews
              - Related courses
              - Course materials
              - Discussion forum
              etc. */}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
