/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ProfileAcademicExperienceEntry = {
    /**
     * An enum field
     */
    degree_level?: ProfileAcademicExperienceEntry.degree_level;
    /**
     * An enum field
     */
    degree_status?: ProfileAcademicExperienceEntry.degree_status;
    /**
     * A string field
     */
    course_or_major?: string;
    /**
     * A string field
     */
    institution?: string;
    /**
     * A date field
     */
    start_date?: string;
    /**
     * A date field
     */
    end_date?: string;
};
export namespace ProfileAcademicExperienceEntry {
    /**
     * An enum field
     */
    export enum degree_level {
        HIGH_SCHOOL_DIPLOMA = 'High School Diploma',
        VOCATIONAL_TECHNICAL_DEGREE = 'Vocational/Technical Degree',
        ASSOCIATE_S_DEGREE = 'Associate\'s Degree',
        BACHELOR_S_DEGREE = 'Bachelor\'s Degree',
        MASTER_S_DEGREE = 'Master\'s Degree',
        DOCTORATE_PH_D_ = 'Doctorate (Ph.D.)',
        OTHER = 'Other',
    }
    /**
     * An enum field
     */
    export enum degree_status {
        COMPLETED = 'Completed',
        IN_PROGRESS = 'In Progress',
    }
}

