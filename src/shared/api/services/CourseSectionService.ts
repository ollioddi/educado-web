/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiCourseCourseDocument } from '../models/ApiCourseCourseDocument';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CourseSectionService {
    /**
     * @param fields
     * @param filters
     * @param q
     * @param pagination
     * @param sort
     * @param populate
     * @param status
     * @returns any OK
     * @throws ApiError
     */
    public static courseSectionGetCourseSections(
        fields?: Array<'title' | 'createdAt' | 'updatedAt' | 'publishedAt'>,
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
        sort?: ('title' | 'createdAt' | 'updatedAt' | 'publishedAt' | Array<'title' | 'createdAt' | 'updatedAt' | 'publishedAt'> | Record<string, 'asc' | 'desc'> | Array<Record<string, 'asc' | 'desc'>>),
        populate?: (string | 'course' | 'content_items' | Array<'course' | 'content_items'>),
        status?: 'draft' | 'published',
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
            title: string;
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
            course?: ApiCourseCourseDocument;
            /**
             * A dynamic zone field
             */
            content_items?: Array<any>;
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/course-sections',
            query: {
                'fields': fields,
                'filters': filters,
                '_q': q,
                'pagination': pagination,
                'sort': sort,
                'populate': populate,
                'status': status,
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
     * @param status
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static courseSectionPostCourseSections(
        fields?: Array<'title' | 'createdAt' | 'updatedAt' | 'publishedAt'>,
        populate?: (string | 'course' | 'content_items' | Array<'course' | 'content_items'>),
        status?: 'draft' | 'published',
        requestBody?: {
            data: {
                /**
                 * A string field
                 */
                title: string;
                /**
                 * A datetime field
                 */
                publishedAt: string;
                /**
                 * A relational field
                 */
                course?: string;
                /**
                 * A dynamic zone field
                 */
                content_items?: Array<any>;
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
            title: string;
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
            course?: ApiCourseCourseDocument;
            /**
             * A dynamic zone field
             */
            content_items?: Array<any>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/course-sections',
            query: {
                'fields': fields,
                'populate': populate,
                'status': status,
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
     * @param status
     * @returns any OK
     * @throws ApiError
     */
    public static courseSectionGetCourseSectionsById(
        id: string,
        fields?: Array<'title' | 'createdAt' | 'updatedAt' | 'publishedAt'>,
        populate?: (string | 'course' | 'content_items' | Array<'course' | 'content_items'>),
        filters?: Record<string, any>,
        sort?: ('title' | 'createdAt' | 'updatedAt' | 'publishedAt' | Array<'title' | 'createdAt' | 'updatedAt' | 'publishedAt'> | Record<string, 'asc' | 'desc'> | Array<Record<string, 'asc' | 'desc'>>),
        status?: 'draft' | 'published',
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
            title: string;
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
            course?: ApiCourseCourseDocument;
            /**
             * A dynamic zone field
             */
            content_items?: Array<any>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/course-sections/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields': fields,
                'populate': populate,
                'filters': filters,
                'sort': sort,
                'status': status,
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
     * @param status
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static courseSectionPutCourseSectionsById(
        id: string,
        fields?: Array<'title' | 'createdAt' | 'updatedAt' | 'publishedAt'>,
        populate?: (string | 'course' | 'content_items' | Array<'course' | 'content_items'>),
        status?: 'draft' | 'published',
        requestBody?: {
            data: {
                /**
                 * A string field
                 */
                title?: string;
                /**
                 * A datetime field
                 */
                publishedAt?: string;
                /**
                 * A relational field
                 */
                course?: string;
                /**
                 * A dynamic zone field
                 */
                content_items?: Array<any>;
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
            title: string;
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
            course?: ApiCourseCourseDocument;
            /**
             * A dynamic zone field
             */
            content_items?: Array<any>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/course-sections/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields': fields,
                'populate': populate,
                'status': status,
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
     * @param status
     * @returns any OK
     * @throws ApiError
     */
    public static courseSectionDeleteCourseSectionsById(
        id: string,
        fields?: Array<'title' | 'createdAt' | 'updatedAt' | 'publishedAt'>,
        populate?: (string | 'course' | 'content_items' | Array<'course' | 'content_items'>),
        filters?: Record<string, any>,
        status?: 'draft' | 'published',
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
            title: string;
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
            course?: ApiCourseCourseDocument;
            /**
             * A dynamic zone field
             */
            content_items?: Array<any>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/course-sections/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields': fields,
                'populate': populate,
                'filters': filters,
                'status': status,
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
