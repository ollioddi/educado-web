export interface User {
    email: string;
    role: AuthRole;
    isVerified: boolean;
}

export type AuthRole = 'admin' | 'author';

export const ROLE_LEVELS: Record<AuthRole, number> = {
    author: 1,
    admin: 2,
};