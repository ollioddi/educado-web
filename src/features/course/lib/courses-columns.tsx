import { type CellContext, type ColumnDef } from "@tanstack/react-table";
import { BookOpen, MoreHorizontal, Star, Edit, Eye } from "lucide-react";
import { toast } from "sonner";

import type { ApiCourseCourseDocument } from "@/shared/api/models/ApiCourseCourseDocument";
import { Badge } from "@/shared/components/shadcn/badge";
import { Button } from "@/shared/components/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/shadcn/dropdown-menu";
import type { useRouter } from "@tanstack/react-router";

interface CoursesColumnsProps {
  t: (key: string) => string;
  router: ReturnType<typeof useRouter>;
}

export const createCourseColumns = ({
  t,
  router,
}: CoursesColumnsProps): ColumnDef<ApiCourseCourseDocument>[] => {
  const handleView = (documentId: string) => {
    void router.navigate({ to: `/courses/${documentId}` });
  };

  const handleEdit = (documentId: string) => {
    toast.success("Edit functionality is not implemented yet." + documentId);
  };

  const handleDelete = (documentId: string) => {
    toast.success("Delete functionality is not implemented yet." + documentId);
  };

  return [
    {
      accessorKey: "title",
      header: t("course.courseName"),
      cell: ({ row }) => {
        const course = row.original;
        return (
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="font-medium">{course.title}</span>
          </div>
        );
      },
      meta: {
        sortable: true,
        filterable: true,
        visibleByDefault: true,
      },
    },
    {
      accessorKey: "course_categories",
      header: t("category.categories"),
      cell: ({ row }) => {
        const course = row.original;
        const categories = course.course_categories ?? [];

        if (categories.length === 0) {
          return (
            <span className="text-muted-foreground">
              {t("category.categoriesNotFound")}
            </span>
          );
        }

        return (
          <div className="flex flex-wrap gap-1">
            {categories.slice(0, 2).map((category) => (
              <Badge
                key={category.id}
                variant="secondary"
                className={
                  category.badge_color
                    ? "text-white"
                    : "bg-[#c1cfd7] text-[#246670]"
                }
                style={
                  category.badge_color
                    ? { backgroundColor: category.badge_color }
                    : undefined
                }
              >
                {category.name}
              </Badge>
            ))}
            {categories.length > 2 && (
              <Badge variant="outline">
                +{categories.length - 2} {t("common.more").toLowerCase()}
              </Badge>
            )}
          </div>
        );
      },
      meta: {
        sortable: false,
        filterable: true,
        visibleByDefault: true,
      },
    },
    {
      id: "rating",
      header: t("rating.rating"),
      cell: () => {
        // Placeholder rating - you can replace this with actual rating data later
        const rating = 4.2;
        return (
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        );
      },
      meta: {
        sortable: true,
        filterable: false,
        visibleByDefault: true,
      },
    },
    {
      id: "actions",
      header: t("common.actions"),
      cell: ({ row }: CellContext<ApiCourseCourseDocument, unknown>) => {
        const documentId = row.original.documentId;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">{t("common.openMenu")}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t("common.actions")}</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  handleView(documentId);
                }}
              >
                <Eye className="mr-2 h-4 w-4" />
                {t("common.view")} {t("course.course").toLowerCase()}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  handleEdit(documentId);
                }}
              >
                <Edit className="mr-2 h-4 w-4" />
                {t("common.edit")} {t("course.course").toLowerCase()}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  handleDelete(documentId);
                }}
                className="text-destructive"
              >
                {t("common.delete")} {t("course.course").toLowerCase()}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      meta: {
        sortable: false,
        filterable: false,
        visibleByDefault: true,
      },
    },
  ];
};
