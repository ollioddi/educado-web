import { BookOpen } from "lucide-react";

import type { ApiCourseCategoryCourseCategoryDocument } from "@/shared/api/models/ApiCourseCategoryCourseCategoryDocument";
import { Badge } from "@/shared/components/shadcn/badge";

const CategoryBadges = ({
  categories,
}: {
  categories: ApiCourseCategoryCourseCategoryDocument[];
}) => {
  return categories.map((category) => (
    <Badge
      key={category.id}
      variant="secondary"
      className={
        category.badge_color ? "text-white" : "bg-[#c1cfd7] text-[#246670]"
      }
      style={
        category.badge_color
          ? { backgroundColor: category.badge_color }
          : undefined
      }
    >
      <BookOpen />
      {category.name}
    </Badge>
  ));
};

export default CategoryBadges;
