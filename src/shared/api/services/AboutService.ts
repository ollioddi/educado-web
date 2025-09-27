/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AboutService {
    /**
     * @param fields
     * @param populate
     * @param filters
     * @returns any OK
     * @throws ApiError
     */
    public static aboutGetAbout(
        fields?: Array<'title' | 'createdAt' | 'updatedAt' | 'publishedAt'>,
        populate?: (string | 'blocks' | Array<'blocks'>),
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
            title?: string;
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
             * A dynamic zone field
             */
            blocks?: Array<any>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/about',
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
    /**
     * @param fields
     * @param populate
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static aboutPutAbout(
        fields?: Array<'title' | 'createdAt' | 'updatedAt' | 'publishedAt'>,
        populate?: (string | 'blocks' | Array<'blocks'>),
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
                 * A dynamic zone field
                 */
                blocks?: Array<any>;
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
            title?: string;
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
             * A dynamic zone field
             */
            blocks?: Array<any>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/about',
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
     * @param fields
     * @param populate
     * @returns any OK
     * @throws ApiError
     */
    public static aboutDeleteAbout(
        fields?: Array<'title' | 'createdAt' | 'updatedAt' | 'publishedAt'>,
        populate?: (string | 'blocks' | Array<'blocks'>),
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
            title?: string;
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
             * A dynamic zone field
             */
            blocks?: Array<any>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/about',
            query: {
                'fields': fields,
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
}
