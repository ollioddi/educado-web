/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiCourseCourseDocument } from './ApiCourseCourseDocument';
export type ApiCourseSectionCourseSectionDocument = {
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

