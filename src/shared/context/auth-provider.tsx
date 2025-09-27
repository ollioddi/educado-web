import { useCallback, useMemo, type ReactNode } from "react";

import { ROLE_LEVELS, type AuthRole, type User } from "@/auth/types/user";
import wait from "@/shared/lib/wait";

import {
  AuthContext,
  type AuthContextType,
  type LoginParams,
  type RegisterParams,
} from "../hooks/use-auth";
import { useLocalStorage } from "../hooks/use-localstorage";

import type { AppRouter } from "src/main";

export const AuthProvider = ({
  router,
  children,
}: Readonly<{ router: AppRouter; children: ReactNode }>) => {
  const [user, setUser] = useLocalStorage<User | null>("auth_user", null);

  const logout = useCallback(async () => {
    await wait(2); // Simulate async operation like API call
    setUser(null);
    void router.navigate({ to: "/login" });
  }, [router, setUser]);

  const login = useCallback(
    async (params: LoginParams) => {
      await wait(2); // Simulate async operation like API call

      // Simulate backend response - manually create user with additional attributes
      const simulatedUser: User = {
        email: params.email,
        role: "author", // Simulate default role or determine from backend
        isVerified: true, // Simulate verified status from backend
      };

      setUser(simulatedUser);

      if (!simulatedUser.isVerified) {
        // Navigation commented out until route is added
        // void router.navigate({ to: "/create-application" });
      }

      if (simulatedUser.role === "admin") {
        // Navigation commented out until route is added
        // void router.navigate({ to: "/admin-dashboard" });
      }

      void router.navigate({ to: "/courses" });
    },
    [router, setUser]
  );

  const register = useCallback(
    async (params: RegisterParams) => {
      await wait(2); // Simulate async operation like API call

      // Simulate backend response - manually create user with additional attributes
      const simulatedUser: User = {
        email: params.email,
        role: params.role,
        isVerified: false, // New users typically start unverified
      };

      setUser(simulatedUser);

      // Note: Navigation commented out until route is added
      // void router.navigate({ to: "/create-application" });
    },
    [setUser]
  );

  const isRole = useCallback(
    (target: AuthRole): boolean => {
      const currentRole = user?.role;

      if (currentRole == null) return false;
      return ROLE_LEVELS[currentRole] >= ROLE_LEVELS[target];
    },
    [user?.role]
  );

  const isAuthenticated = useMemo(() => user != null, [user]);

  const authContextValue: AuthContextType = useMemo(
    () => ({
      user: user ?? undefined,
      login,
      logout,
      register,
      isRole,
      isAuthenticated,
    }),
    [user, login, logout, register, isRole, isAuthenticated]
  );

  return <AuthContext value={authContextValue}>{children}</AuthContext>;
};
