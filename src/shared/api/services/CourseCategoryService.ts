/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiCourseCourseDocument } from '../models/ApiCourseCourseDocument';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CourseCategoryService {
    /**
     * @param fields
     * @param filters
     * @param q
     * @param pagination
     * @param sort
     * @param populate
     * @returns any OK
     * @throws ApiError
     */
    public static courseCategoryGetCourseCategories(
        fields?: Array<'name' | 'badge_color' | 'createdAt' | 'updatedAt' | 'publishedAt'>,
        filters?: Record<string, any>,
        q?: string,
        pagination?: ({
            /**
             * Include total count in response
             */
            withCount?: boolean;
        } & ({
            /**
             * Page number (1-based)
             */
            page: number;
            /**
             * Number of entries per page
             */
            pageSize: number;
        } | {
            /**
             * Number of entries to skip
             */
            start: number;
            /**
             * Maximum number of entries to return
             */
            limit: number;
        })),
        sort?: ('name' | 'badge_color' | 'createdAt' | 'updatedAt' | 'publishedAt' | Array<'name' | 'badge_color' | 'createdAt' | 'updatedAt' | 'publishedAt'> | Record<string, 'asc' | 'desc'> | Array<Record<string, 'asc' | 'desc'>>),
        populate?: (string | 'courses' | Array<'courses'>),
    ): CancelablePromise<{
        data: Array<{
            /**
             * The document ID, represented by a UUID
             */
            documentId: string;
            id: number;
            /**
             * A string field
             */
            name: string;
            /**
             * A string field
             */
            badge_color?: string;
            /**
             * A datetime field
             */
            createdAt?: string;
            /**
             * A datetime field
             */
            updatedAt?: string;
            /**
             * A datetime field
             */
            publishedAt: string;
            /**
             * A relational field
             */
            courses?: Array<ApiCourseCourseDocument>;
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/course-categories',
            query: {
                'fields': fields,
                'filters': filters,
                '_q': q,
                'pagination': pagination,
                'sort': sort,
                'populate': populate,
            },
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * @param fields
     * @param populate
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static courseCategoryPostCourseCategories(
        fields?: Array<'name' | 'badge_color' | 'createdAt' | 'updatedAt' | 'publishedAt'>,
        populate?: (string | 'courses' | Array<'courses'>),
        requestBody?: {
            data: {
                /**
                 * A string field
                 */
                name: string;
                /**
                 * A string field
                 */
                badge_color?: string;
                /**
                 * A datetime field
                 */
                publishedAt: string;
                /**
                 * A relational field
                 */
                courses?: Array<string>;
            };
        },
    ): CancelablePromise<{
        data: {
            /**
             * The document ID, represented by a UUID
             */
            documentId: string;
            id: number;
            /**
             * A string field
             */
            name: string;
            /**
             * A string field
             */
            badge_color?: string;
            /**
             * A datetime field
             */
            createdAt?: string;
            /**
             * A datetime field
             */
            updatedAt?: string;
            /**
             * A datetime field
             */
            publishedAt: string;
            /**
             * A relational field
             */
            courses?: Array<ApiCourseCourseDocument>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/course-categories',
            query: {
                'fields': fields,
                'populate': populate,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * @param id
     * @param fields
     * @param populate
     * @param filters
     * @param sort
     * @returns any OK
     * @throws ApiError
     */
    public static courseCategoryGetCourseCategoriesById(
        id: string,
        fields?: Array<'name' | 'badge_color' | 'createdAt' | 'updatedAt' | 'publishedAt'>,
        populate?: (string | 'courses' | Array<'courses'>),
        filters?: Record<string, any>,
        sort?: ('name' | 'badge_color' | 'createdAt' | 'updatedAt' | 'publishedAt' | Array<'name' | 'badge_color' | 'createdAt' | 'updatedAt' | 'publishedAt'> | Record<string, 'asc' | 'desc'> | Array<Record<string, 'asc' | 'desc'>>),
    ): CancelablePromise<{
        data: {
            /**
             * The document ID, represented by a UUID
             */
            documentId: string;
            id: number;
            /**
             * A string field
             */
            name: string;
            /**
             * A string field
             */
            badge_color?: string;
            /**
             * A datetime field
             */
            createdAt?: string;
            /**
             * A datetime field
             */
            updatedAt?: string;
            /**
             * A datetime field
             */
            publishedAt: string;
            /**
             * A relational field
             */
            courses?: Array<ApiCourseCourseDocument>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/course-categories/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields': fields,
                'populate': populate,
                'filters': filters,
                'sort': sort,
            },
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * @param id
     * @param fields
     * @param populate
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static courseCategoryPutCourseCategoriesById(
        id: string,
        fields?: Array<'name' | 'badge_color' | 'createdAt' | 'updatedAt' | 'publishedAt'>,
        populate?: (string | 'courses' | Array<'courses'>),
        requestBody?: {
            data: {
                /**
                 * A string field
                 */
                name?: string;
                /**
                 * A string field
                 */
                badge_color?: string;
                /**
                 * A datetime field
                 */
                publishedAt?: string;
                /**
                 * A relational field
                 */
                courses?: Array<string>;
            };
        },
    ): CancelablePromise<{
        data: {
            /**
             * The document ID, represented by a UUID
             */
            documentId: string;
            id: number;
            /**
             * A string field
             */
            name: string;
            /**
             * A string field
             */
            badge_color?: string;
            /**
             * A datetime field
             */
            createdAt?: string;
            /**
             * A datetime field
             */
            updatedAt?: string;
            /**
             * A datetime field
             */
            publishedAt: string;
            /**
             * A relational field
             */
            courses?: Array<ApiCourseCourseDocument>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/course-categories/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields': fields,
                'populate': populate,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * @param id
     * @param fields
     * @param populate
     * @param filters
     * @returns any OK
     * @throws ApiError
     */
    public static courseCategoryDeleteCourseCategoriesById(
        id: string,
        fields?: Array<'name' | 'badge_color' | 'createdAt' | 'updatedAt' | 'publishedAt'>,
        populate?: (string | 'courses' | Array<'courses'>),
        filters?: Record<string, any>,
    ): CancelablePromise<{
        data: {
            /**
             * The document ID, represented by a UUID
             */
            documentId: string;
            id: number;
            /**
             * A string field
             */
            name: string;
            /**
             * A string field
             */
            badge_color?: string;
            /**
             * A datetime field
             */
            createdAt?: string;
            /**
             * A datetime field
             */
            updatedAt?: string;
            /**
             * A datetime field
             */
            publishedAt: string;
            /**
             * A relational field
             */
            courses?: Array<ApiCourseCourseDocument>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/course-categories/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields': fields,
                'populate': populate,
                'filters': filters,
            },
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }
}
