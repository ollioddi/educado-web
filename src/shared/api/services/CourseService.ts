/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiCourseCategoryCourseCategoryDocument } from '../models/ApiCourseCategoryCourseCategoryDocument';
import type { ApiCourseSectionCourseSectionDocument } from '../models/ApiCourseSectionCourseSectionDocument';
import type { PluginUploadFileDocument } from '../models/PluginUploadFileDocument';
import type { PluginUsersPermissionsUserDocument } from '../models/PluginUsersPermissionsUserDocument';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CourseService {
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
    public static courseGetCourses(
        fields?: Array<'title' | 'level' | 'description' | 'createdAt' | 'updatedAt' | 'publishedAt'>,
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
        sort?: ('title' | 'level' | 'description' | 'createdAt' | 'updatedAt' | 'publishedAt' | Array<'title' | 'level' | 'description' | 'createdAt' | 'updatedAt' | 'publishedAt'> | Record<string, 'asc' | 'desc'> | Array<Record<string, 'asc' | 'desc'>>),
        populate?: (string | 'cover_image' | 'course_categories' | 'authors' | 'course_sections' | Array<'cover_image' | 'course_categories' | 'authors' | 'course_sections'>),
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
             * An enum field
             */
            level: 'Beginner' | 'Intermediate' | 'Advanced';
            /**
             * A blocks field
             */
            description: Array<any>;
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
             * A media field
             */
            cover_image?: PluginUploadFileDocument;
            /**
             * A relational field
             */
            course_categories?: Array<ApiCourseCategoryCourseCategoryDocument>;
            /**
             * A relational field
             */
            authors?: Array<PluginUsersPermissionsUserDocument>;
            /**
             * A relational field
             */
            course_sections?: Array<ApiCourseSectionCourseSectionDocument>;
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/courses',
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
    public static coursePostCourses(
        fields?: Array<'title' | 'level' | 'description' | 'createdAt' | 'updatedAt' | 'publishedAt'>,
        populate?: (string | 'cover_image' | 'course_categories' | 'authors' | 'course_sections' | Array<'cover_image' | 'course_categories' | 'authors' | 'course_sections'>),
        status?: 'draft' | 'published',
        requestBody?: {
            data: {
                /**
                 * A string field
                 */
                title: string;
                /**
                 * An enum field
                 */
                level: 'Beginner' | 'Intermediate' | 'Advanced';
                /**
                 * A blocks field
                 */
                description: Array<any>;
                /**
                 * A datetime field
                 */
                publishedAt: string;
                /**
                 * A media field
                 */
                cover_image?: any;
                /**
                 * A relational field
                 */
                course_categories?: Array<string>;
                /**
                 * A relational field
                 */
                authors?: Array<string>;
                /**
                 * A relational field
                 */
                course_sections?: Array<string>;
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
             * An enum field
             */
            level: 'Beginner' | 'Intermediate' | 'Advanced';
            /**
             * A blocks field
             */
            description: Array<any>;
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
             * A media field
             */
            cover_image?: PluginUploadFileDocument;
            /**
             * A relational field
             */
            course_categories?: Array<ApiCourseCategoryCourseCategoryDocument>;
            /**
             * A relational field
             */
            authors?: Array<PluginUsersPermissionsUserDocument>;
            /**
             * A relational field
             */
            course_sections?: Array<ApiCourseSectionCourseSectionDocument>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/courses',
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
    public static courseGetCoursesById(
        id: string,
        fields?: Array<'title' | 'level' | 'description' | 'createdAt' | 'updatedAt' | 'publishedAt'>,
        populate?: (string | 'cover_image' | 'course_categories' | 'authors' | 'course_sections' | Array<'cover_image' | 'course_categories' | 'authors' | 'course_sections'>),
        filters?: Record<string, any>,
        sort?: ('title' | 'level' | 'description' | 'createdAt' | 'updatedAt' | 'publishedAt' | Array<'title' | 'level' | 'description' | 'createdAt' | 'updatedAt' | 'publishedAt'> | Record<string, 'asc' | 'desc'> | Array<Record<string, 'asc' | 'desc'>>),
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
             * An enum field
             */
            level: 'Beginner' | 'Intermediate' | 'Advanced';
            /**
             * A blocks field
             */
            description: Array<any>;
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
             * A media field
             */
            cover_image?: PluginUploadFileDocument;
            /**
             * A relational field
             */
            course_categories?: Array<ApiCourseCategoryCourseCategoryDocument>;
            /**
             * A relational field
             */
            authors?: Array<PluginUsersPermissionsUserDocument>;
            /**
             * A relational field
             */
            course_sections?: Array<ApiCourseSectionCourseSectionDocument>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/courses/{id}',
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
    public static coursePutCoursesById(
        id: string,
        fields?: Array<'title' | 'level' | 'description' | 'createdAt' | 'updatedAt' | 'publishedAt'>,
        populate?: (string | 'cover_image' | 'course_categories' | 'authors' | 'course_sections' | Array<'cover_image' | 'course_categories' | 'authors' | 'course_sections'>),
        status?: 'draft' | 'published',
        requestBody?: {
            data: {
                /**
                 * A string field
                 */
                title?: string;
                /**
                 * An enum field
                 */
                level?: 'Beginner' | 'Intermediate' | 'Advanced';
                /**
                 * A blocks field
                 */
                description?: Array<any>;
                /**
                 * A datetime field
                 */
                publishedAt?: string;
                /**
                 * A media field
                 */
                cover_image?: any;
                /**
                 * A relational field
                 */
                course_categories?: Array<string>;
                /**
                 * A relational field
                 */
                authors?: Array<string>;
                /**
                 * A relational field
                 */
                course_sections?: Array<string>;
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
             * An enum field
             */
            level: 'Beginner' | 'Intermediate' | 'Advanced';
            /**
             * A blocks field
             */
            description: Array<any>;
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
             * A media field
             */
            cover_image?: PluginUploadFileDocument;
            /**
             * A relational field
             */
            course_categories?: Array<ApiCourseCategoryCourseCategoryDocument>;
            /**
             * A relational field
             */
            authors?: Array<PluginUsersPermissionsUserDocument>;
            /**
             * A relational field
             */
            course_sections?: Array<ApiCourseSectionCourseSectionDocument>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/courses/{id}',
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
    public static courseDeleteCoursesById(
        id: string,
        fields?: Array<'title' | 'level' | 'description' | 'createdAt' | 'updatedAt' | 'publishedAt'>,
        populate?: (string | 'cover_image' | 'course_categories' | 'authors' | 'course_sections' | Array<'cover_image' | 'course_categories' | 'authors' | 'course_sections'>),
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
             * An enum field
             */
            level: 'Beginner' | 'Intermediate' | 'Advanced';
            /**
             * A blocks field
             */
            description: Array<any>;
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
             * A media field
             */
            cover_image?: PluginUploadFileDocument;
            /**
             * A relational field
             */
            course_categories?: Array<ApiCourseCategoryCourseCategoryDocument>;
            /**
             * A relational field
             */
            authors?: Array<PluginUsersPermissionsUserDocument>;
            /**
             * A relational field
             */
            course_sections?: Array<ApiCourseSectionCourseSectionDocument>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/courses/{id}',
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
