/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PluginUsersPermissionsRoleDocument } from './PluginUsersPermissionsRoleDocument';
export type PluginUsersPermissionsPermissionDocument = {
    /**
     * The document ID, represented by a UUID
     */
    documentId: string;
    id: number;
    /**
     * A string field
     */
    action: string;
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
    role?: PluginUsersPermissionsRoleDocument;
};

