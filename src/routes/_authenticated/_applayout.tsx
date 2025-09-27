import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Suspense } from "react";

import LoadingPage from "@/shared/components/loading-page";
import { Navbar } from "@/shared/components/navbar";

const AuthenticatedLayout = () => {
  return (
    <>
      <Navbar />
      {/* Centered container for all content */}
      <div className="min-h-0 flex-grow">
        <div className="w-full max-w-7xl px-4 sm:px-6 md:px-8 mx-auto">
          <Suspense fallback={<LoadingPage />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export const Route = createFileRoute("/_authenticated/_applayout")({
  component: AuthenticatedLayout,
});
