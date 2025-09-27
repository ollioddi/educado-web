/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiCourseCategoryCourseCategoryDocument } from './ApiCourseCategoryCourseCategoryDocument';
import type { ApiCourseSectionCourseSectionDocument } from './ApiCourseSectionCourseSectionDocument';
import type { PluginUploadFileDocument } from './PluginUploadFileDocument';
import type { PluginUsersPermissionsUserDocument } from './PluginUsersPermissionsUserDocument';
export type ApiCourseCourseDocument = {
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
    level: ApiCourseCourseDocument.level;
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
export namespace ApiCourseCourseDocument {
    /**
     * An enum field
     */
    export enum level {
        BEGINNER = 'Beginner',
        INTERMEDIATE = 'Intermediate',
        ADVANCED = 'Advanced',
    }
}

