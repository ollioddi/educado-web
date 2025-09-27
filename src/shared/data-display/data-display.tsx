"use client";

import { useState } from "react";

import usePaginatedData from "@/shared/hooks/use-paginated-data";

import DataDisplayToolbar from "./data-display-toolbar";
import DataGrid from "./data-grid";
import DataTable from "./data-table";
import PaginationBar from "./pagination-bar";

import type {
  DataDisplayProps,
  DataDisplayItem,
  ViewMode,
} from "./types/data-display-types";

export const DataDisplay = <T extends DataDisplayItem>({
  queryFn,
  queryKey,
  columns,
  gridItemRender,
  emptyState,
  className,
  initialPageSize = 10,
  fields,
  populate,
  status,
  filters,
  config,
}: DataDisplayProps<T>) => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchValue, setSearchValue] = useState("");

  // Use the existing usePaginatedData hook
  const { data, isLoading, error, extendedPagination, setPagination } =
    usePaginatedData<T>({
      queryFn,
      queryKey,
      initialPageSize,
      fields,
      populate,
      status,
      filters,
      config,
      globalSearch: searchValue,
    });

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Error loading data: {error.message}</p>
      </div>
    );
  }

  function getDataComponent(): React.ReactElement {
    if (data.length === 0 && !isLoading) {
      return (
        <div className="text-center py-12">
          {emptyState ?? (
            <p className="text-muted-foreground">No items found</p>
          )}
        </div>
      );
    }

    return viewMode === "grid" ? (
      <DataGrid
        data={data}
        gridItemRender={gridItemRender}
        isLoading={isLoading}
      />
    ) : (
      <DataTable data={data} columns={columns} isLoading={isLoading} />
    );
  }

  return (
    <div className={`space-y-4 ${className ?? ""}`}>
      {/* Toolbar for view mode switching and search */}
      <DataDisplayToolbar
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
      />

      {/* Data display */}
      {getDataComponent()}

      {/* Pagination */}
      <PaginationBar pagination={extendedPagination} onChange={setPagination} />
    </div>
  );
};
