/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiCourseCourseDocument } from './ApiCourseCourseDocument';
import type { PluginUsersPermissionsRoleDocument } from './PluginUsersPermissionsRoleDocument';
import type { ProfileAcademicExperienceEntry } from './ProfileAcademicExperienceEntry';
import type { ProfileProfessionalExperienceEntry } from './ProfileProfessionalExperienceEntry';
export type PluginUsersPermissionsUserDocument = {
    /**
     * The document ID, represented by a UUID
     */
    documentId: string;
    id: number;
    /**
     * A string field
     */
    username: string;
    /**
     * An email field
     */
    email: string;
    /**
     * A string field
     */
    provider?: string;
    /**
     * A boolean field
     */
    confirmed: boolean;
    /**
     * A boolean field
     */
    blocked: boolean;
    /**
     * A blocks field
     */
    biography: Array<any>;
    /**
     * A blocks field
     */
    motivations: Array<any>;
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
    /**
     * A component field
     */
    professional_experiences?: Array<ProfileProfessionalExperienceEntry>;
    /**
     * A component field
     */
    academic_experiences?: Array<ProfileAcademicExperienceEntry>;
    /**
     * A relational field
     */
    courses?: Array<ApiCourseCourseDocument>;
};

