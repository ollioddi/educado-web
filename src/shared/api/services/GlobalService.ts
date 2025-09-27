/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PluginUploadFileDocument } from '../models/PluginUploadFileDocument';
import type { SharedSeoEntry } from '../models/SharedSeoEntry';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GlobalService {
    /**
     * @param fields
     * @param populate
     * @param filters
     * @returns any OK
     * @throws ApiError
     */
    public static globalGetGlobal(
        fields?: Array<'siteName' | 'siteDescription' | 'createdAt' | 'updatedAt' | 'publishedAt'>,
        populate?: (string | 'favicon' | 'defaultSeo' | Array<'favicon' | 'defaultSeo'>),
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
            siteName: string;
            /**
             * A text field
             */
            siteDescription: string;
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
            favicon?: PluginUploadFileDocument;
            /**
             * A component field
             */
            defaultSeo?: SharedSeoEntry;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/global',
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
    public static globalPutGlobal(
        fields?: Array<'siteName' | 'siteDescription' | 'createdAt' | 'updatedAt' | 'publishedAt'>,
        populate?: (string | 'favicon' | 'defaultSeo' | Array<'favicon' | 'defaultSeo'>),
        requestBody?: {
            data: {
                /**
                 * A string field
                 */
                siteName?: string;
                /**
                 * A text field
                 */
                siteDescription?: string;
                /**
                 * A datetime field
                 */
                publishedAt?: string;
                /**
                 * A media field
                 */
                favicon?: any;
                /**
                 * A component field
                 */
                defaultSeo?: any;
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
            siteName: string;
            /**
             * A text field
             */
            siteDescription: string;
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
            favicon?: PluginUploadFileDocument;
            /**
             * A component field
             */
            defaultSeo?: SharedSeoEntry;
        };
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/global',
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
    public static globalDeleteGlobal(
        fields?: Array<'siteName' | 'siteDescription' | 'createdAt' | 'updatedAt' | 'publishedAt'>,
        populate?: (string | 'favicon' | 'defaultSeo' | Array<'favicon' | 'defaultSeo'>),
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
            siteName: string;
            /**
             * A text field
             */
            siteDescription: string;
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
            favicon?: PluginUploadFileDocument;
            /**
             * A component field
             */
            defaultSeo?: SharedSeoEntry;
        };
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/global',
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
