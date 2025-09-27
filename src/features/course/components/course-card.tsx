import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import type { ApiCourseCourseDocument } from "@/shared/api/models/ApiCourseCourseDocument";
import { Button } from "@/shared/components/shadcn/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/shadcn/card";
import { Separator } from "@/shared/components/shadcn/separator";
import { Rating, RatingButton } from "@/shared/components/shadcn/star-rating";

import CategoryBadges from "./category-badges";

interface CourseCardProps {
  course: ApiCourseCourseDocument;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleEdit = () => {
    toast.success("Edit functionality is not implemented yet.");
  };

  const handleView = () => {
    void navigate({ to: `/courses/${course.documentId}` });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{course.title}</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {course.course_categories &&
            CategoryBadges({ categories: course.course_categories })}
        </div>
        <div>
          <Rating value={4} readOnly>
            {Array.from({ length: 5 }, (_, index) => (
              <RatingButton
                className="mt-2 text-yellow-500"
                key={`star-${String(index)}`}
              />
            ))}
          </Rating>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row justify-end gap-2">
        <Button variant="ghost" onClick={handleEdit}>
          {t("common.edit")}
        </Button>
        <Button variant="outline" className="" onClick={handleView}>
          {t("common.view") + " " + t("course.course")}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
