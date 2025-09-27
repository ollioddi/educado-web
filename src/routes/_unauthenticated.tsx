import { createFileRoute, Outlet } from "@tanstack/react-router";

import { LanguageSwitcher } from "@/shared/components/language-switcher";

const UnauthenticatedLayout = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-between items-start">
          <div className="flex justify-center md:justify-start">
            <div className="flex items-center gap-1 font-medium">
              <img src="/logo.svg" alt="logo" className="w-[24.43px] h-6" />
              <img src="/educado.svg" alt="educado" className="h-6" />
            </div>
          </div>
          <LanguageSwitcher />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/login-background.jpg"
          alt="Background"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export const Route = createFileRoute("/_unauthenticated")({
  component: UnauthenticatedLayout,
});
