import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useMemo, useState, useCallback, useRef, useEffect } from "react";

import type { ColumnFiltersState, OnChangeFn, PaginationState, SortingState } from "@tanstack/react-table";

import type { CancelablePromise } from "../api/core/CancelablePromise";
import type { ExtendedPagination, RenderMode, ResolvedRenderMode } from "../data-display/types/data-display-types";

const DEFAULT_RENDER_MODE: RenderMode = "auto";
const DEFAULT_CLIENT_MODE_THRESHOLD = 100;

// Simple Strapi API function type - flexible to match any Strapi service
// Using a more flexible type that accepts any CancelablePromise with data array
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StrapiApiFunction = (...args: any[]) => CancelablePromise<{ data: readonly any[] }>;

interface UsePaginatedDataConfig {
    overrideRenderMode?: RenderMode;
    overrideClientModeThreshold?: number;
}

interface UsePaginatedDataProperties {
    queryFn: StrapiApiFunction;
    queryKey?: string | (string | Record<string, unknown>)[] | readonly (string | Record<string, unknown>)[];
    config?: UsePaginatedDataConfig;
    initialPageSize?: number;
    externalSorting?: SortingState;
    externalColumnFilters?: ColumnFiltersState;
    enableQuery?: boolean;
    // Strapi-specific parameters
    fields?: string[];
    populate?: string | string[];
    status?: 'draft' | 'published';
    filters?: Record<string, unknown>; // TODO: Probably remove and use column filters only
    globalSearch?: string;
}

interface UsePaginatedDataReturn<T = unknown> {
    data: T[];
    isLoading: boolean;
    isFetching: boolean;
    error: Error | undefined;
    extendedPagination: ExtendedPagination;
    setPagination: OnChangeFn<PaginationState>;
    refetch: () => void;
    resolvedMode: ResolvedRenderMode | undefined;
}

// Convert Tanstack table sorting to Strapi sort format
const convertSortingToStrapiFormat = (sorting: SortingState): string[] => {
    return sorting.map(sort =>
        sort.desc ? `${sort.id}:desc` : `${sort.id}:asc`
    );
};

// Convert pagination state to Strapi pagination format
const convertPaginationToStrapiFormat = (pagination: PaginationState, mode: ResolvedRenderMode, totalItems?: number) => {
    if (mode === 'client') {
        const clientPageSize = totalItems && totalItems > 0 ? totalItems : 1000;
        return {
            page: 1,
            pageSize: clientPageSize,
            withCount: true
        };
    }

    return {
        page: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        withCount: true
    };
};

// Convert column filters to Strapi filters format
const convertFiltersToStrapiFormat = (columnFilters: ColumnFiltersState): Record<string, unknown> | undefined => {
    if (columnFilters.length === 0) return undefined;

    const filters: Record<string, unknown> = {};

    columnFilters.forEach(filter => {
        if (Array.isArray(filter.value)) {
            filters[filter.id] = { $in: filter.value };
        } else if (typeof filter.value === 'string') {
            filters[filter.id] = { $containsi: filter.value };
        } else {
            filters[filter.id] = filter.value;
        }
    });

    return filters;
};

export default function usePaginatedData<T = unknown>({
    queryFn,
    queryKey,
    config,
    initialPageSize = 10,
    externalSorting = [],
    externalColumnFilters = [],
    enableQuery = true,
    fields,
    populate,
    status,
    filters,
    globalSearch,
}: UsePaginatedDataProperties): UsePaginatedDataReturn<T> {
    const { overrideRenderMode, overrideClientModeThreshold } = config ?? {};

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: initialPageSize,
    });

    const [totalItems, setTotalItems] = useState(0);

    // Mode Resolution
    const effectiveMode = overrideRenderMode ?? DEFAULT_RENDER_MODE;
    const effectiveClientModeThreshold = overrideClientModeThreshold ?? DEFAULT_CLIENT_MODE_THRESHOLD;

    // Root query key resolution
    const rootKey = useMemo<(string | Record<string, unknown>)[]>(() => {
        // User has provided an array key
        if (Array.isArray(queryKey)) {
            return queryKey.length > 0 ? queryKey : [queryFn.name];
        }

        // User has provided a non-empty string key
        if (typeof queryKey === "string" && queryKey.trim() !== "") {
            return [queryKey];
        }

        // Fallback to function name as key
        return [queryFn.name];
    }, [queryKey, queryFn.name]);

    // Detection query for auto mode
    const detectionQuery = useQuery({
        queryKey: [...rootKey, "detect"],
        queryFn: async ({ signal }) => {

            // Only need to fetch a single element. Total count is in metadata
            const detectionPagination = {
                page: 1,
                pageSize: 1,
                withCount: true
            };

            const combinedFilters = {
                ...filters,
                ...convertFiltersToStrapiFormat(externalColumnFilters),
            };

            const promise = queryFn(
                fields,
                Object.keys(combinedFilters).length > 0 ? combinedFilters : undefined,
                globalSearch,
                detectionPagination,
                convertSortingToStrapiFormat(externalSorting),
                populate,
                status
            );

            if (signal.aborted) {
                promise.cancel();
                throw new Error('Request was cancelled');
            }

            signal.addEventListener('abort', () => {
                promise.cancel();
            });

            const result = await promise as {
                meta: {
                    pagination: { total: number; page: number; pageSize: number; pageCount: number };
                }; data: T[]
            };

            setTotalItems(result.meta.pagination.total);

            // eslint-disable-next-line no-console
            console.log('Detection query result:', result);
            return result;
        },
        enabled: enableQuery && effectiveMode === "auto",
        staleTime: 1000 * 60 * 5,
        retry: 3,
        retryOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    // Determine the final, resolved mode
    const resolvedMode = useMemo<ResolvedRenderMode | undefined>(() => {
        if (effectiveMode !== "auto") {
            return effectiveMode;
        }
        if (detectionQuery.isSuccess) {
            // eslint-disable-next-line no-console
            console.log('Detection - resolving mode with totalItems:', totalItems);
            return totalItems <= effectiveClientModeThreshold ? "client" : "server";
        }
        if (detectionQuery.isError) {
            // eslint-disable-next-line no-console  
            console.log('Detection failed, defaulting to server mode');
            return "server";
        }
        // Return server mode as default instead of undefined to prevent null states
        return "server";
    }, [effectiveMode, detectionQuery.isSuccess, detectionQuery.isError, detectionQuery.data, effectiveClientModeThreshold]);

    // Main data query
    const mainQuery = useQuery({
        queryKey: [
            ...rootKey,
            resolvedMode,
            ...(resolvedMode === "server"
                ? [
                    "page", pagination.pageIndex,
                    "pageSize", pagination.pageSize,
                    "sort", JSON.stringify(externalSorting),
                    "filters", JSON.stringify(externalColumnFilters),
                    "customFilters", JSON.stringify(filters),
                    "globalSearch", globalSearch,
                    "fields", JSON.stringify(fields),
                    "populate", JSON.stringify(populate),
                    "status", status,
                ]
                : [
                    "sort", JSON.stringify(externalSorting),
                    "filters", JSON.stringify(externalColumnFilters),
                    "customFilters", JSON.stringify(filters),
                    "globalSearch", globalSearch,
                    "fields", JSON.stringify(fields),
                    "populate", JSON.stringify(populate),
                    "status", status,
                ]),
        ],
        queryFn: async ({ signal }) => {
            const strapiPagination = convertPaginationToStrapiFormat(pagination, resolvedMode ?? 'server', totalItems);

            // eslint-disable-next-line no-console
            console.debug('Main query executing:', {
                resolvedMode,
                totalItems,
                strapiPagination,
                currentPage: pagination.pageIndex,
                pageSize: pagination.pageSize
            });

            const combinedFilters = {
                ...filters,
                ...convertFiltersToStrapiFormat(externalColumnFilters),
            };

            const promise = queryFn(
                fields,
                Object.keys(combinedFilters).length > 0 ? combinedFilters : undefined,
                globalSearch,
                strapiPagination,
                convertSortingToStrapiFormat(externalSorting),
                populate,
                status
            );

            if (signal.aborted) {
                promise.cancel();
                throw new Error('Request was cancelled');
            }

            signal.addEventListener('abort', () => {
                promise.cancel();
            });

            const result = await promise as {
                meta: {
                    pagination: { total: number; page: number; pageSize: number; pageCount: number };
                }; data: T[]
            };

            setTotalItems(result.meta.pagination.total);

            return result;
        },
        enabled: enableQuery && (effectiveMode !== "auto" || detectionQuery.isSuccess || detectionQuery.isError),
        placeholderData: keepPreviousData,
        retry: 3,
        retryOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    // Pagination Reset Logic. Reset to first page if sorting or filters change
    // We use refs to track previous values for comparison
    const previousSortString = useRef(JSON.stringify(externalSorting));
    const previousFilterString = useRef(JSON.stringify(externalColumnFilters));

    useEffect(() => {
        const currentSortString = JSON.stringify(externalSorting);
        const currentFilterString = JSON.stringify(externalColumnFilters);

        if (
            (previousSortString.current !== currentSortString ||
                previousFilterString.current !== currentFilterString) &&
            pagination.pageIndex !== 0
        ) {
            setPagination((p) => ({ ...p, pageIndex: 0 }));
        }
        previousSortString.current = currentSortString;
        previousFilterString.current = currentFilterString;
    }, [externalSorting, externalColumnFilters, pagination.pageIndex]);

    // Exposed Setters and Refetch
    const setPaginationCallback: OnChangeFn<PaginationState> = useCallback(
        (updater) => {
            setPagination((previous) => {
                const newPaginationState =
                    typeof updater === "function" ? updater(previous) : updater;

                if (newPaginationState.pageSize !== previous.pageSize) {
                    return {
                        pageSize: newPaginationState.pageSize,
                        pageIndex: 0,
                    };
                }
                return newPaginationState;
            });
        },
        [],
    );

    // Construct the extended pagination object
    const extendedPagination = useMemo<ExtendedPagination>(() => {
        const totalPages = Math.ceil(totalItems / pagination.pageSize);
        return {
            ...pagination,
            totalItems,
            totalPages,
        };
    }, [pagination, mainQuery.data]);

    // Keep a stable empty array
    const emptyData = useMemo<T[]>(() => [], []);

    return {
        data: mainQuery.data?.data ?? emptyData,
        isLoading: mainQuery.isLoading,
        isFetching: mainQuery.isFetching,
        error: mainQuery.error ?? undefined,
        extendedPagination,
        setPagination: setPaginationCallback,
        refetch: () => { void mainQuery.refetch(); },
        resolvedMode,
    };
}