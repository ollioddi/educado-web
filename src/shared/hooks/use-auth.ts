import { createContext, use } from "react";

import type { AuthRole, User } from "@/auth/types/user";


export interface LoginParams extends Pick<User, 'email'> {
    password: string;
}

export interface RegisterParams extends LoginParams {
    role: AuthRole;
}

export interface AuthContextType {
    user: User | undefined;
    login: (params: LoginParams) => Promise<void>;
    logout: () => void;
    register: (params: RegisterParams) => Promise<void>;
    isRole: (target: AuthRole) => boolean;
    isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = use(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}