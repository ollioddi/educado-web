import { cn } from "../lib/utils";

import { LoaderRefresh } from "./global-loader";

interface LoadingPageProperties {
  isLoading?: boolean;
  fullPage?: boolean;
}

const LoadingPage = ({
  isLoading = true,
  fullPage = true,
}: LoadingPageProperties) => {
  if (!isLoading) return;

  const fullPageClass = fullPage
    ? "absolute z-10 top-0 left-0 right-0 bottom-0"
    : "w-full h-full";

  return (
    <div
      className={cn(
        fullPageClass,
        "bg-background flex flex-col items-center justify-center"
      )}
    >
      <LoaderRefresh className=" text-white w-16 h-16" />
      <p className="text-lg text-white mt-4 ml-4">Loading, please wait...</p>
    </div>
  );
};

export default LoadingPage;
