import type { CancelablePromise } from "@/shared/api/core/CancelablePromise";
import type { PaginationState, ColumnDef } from "@tanstack/react-table";

import type React from "react";

export interface DataDisplayItem {
  id: string | number;
  [key: string]: unknown;
}

export interface ExtendedPagination extends PaginationState {
  totalItems: number;
  totalPages: number;
}

export type RenderMode = "auto" | "client" | "server";
export type ResolvedRenderMode = "client" | "server";

export type ViewMode = "grid" | "table";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StrapiApiFunction = (...args: any[]) => CancelablePromise<{ data: readonly unknown[] }>;

export interface DataDisplayProps<T extends DataDisplayItem> {
  // Core data props - for usePaginatedData
  queryFn: StrapiApiFunction;
  queryKey?: string | (string | Record<string, unknown>)[] | readonly (string | Record<string, unknown>)[];

  // Display configuration
  columns: ColumnDef<T>[];
  gridItemRender?: (item: T) => React.ReactNode;

  // Customization
  emptyState?: React.ReactNode;
  className?: string;

  // usePaginatedData props
  initialPageSize?: number;
  fields?: string[];
  populate?: string | string[];
  status?: 'draft' | 'published';
  filters?: Record<string, unknown>;
  config?: {
    overrideRenderMode?: "auto" | "client" | "server";
    overrideClientModeThreshold?: number;
  };
}

// Props for child components that receive the fetched data
export interface DataComponentProps<T extends DataDisplayItem> {
  data: T[];
  columns: ColumnDef<T>[];
  isLoading?: boolean;
  className?: string;
}

// Props specific to grid component
export interface DataGridProps<T extends DataDisplayItem> {
  data: T[];
  gridItemRender?: (item: T) => React.ReactNode;
  isLoading?: boolean;
  className?: string;
}

// Props for toolbar component
export interface DataDisplayToolbarProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  className?: string;
}