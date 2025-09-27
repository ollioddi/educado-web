/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PluginUsersPermissionsPermissionDocument } from './PluginUsersPermissionsPermissionDocument';
import type { PluginUsersPermissionsUserDocument } from './PluginUsersPermissionsUserDocument';
export type PluginUsersPermissionsRoleDocument = {
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
    description?: string;
    /**
     * A string field
     */
    type?: string;
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
    permissions?: Array<PluginUsersPermissionsPermissionDocument>;
    /**
     * A relational field
     */
    users?: Array<PluginUsersPermissionsUserDocument>;
};

