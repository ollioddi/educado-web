import { Loader, RotateCwIcon } from "lucide-react";

import { cn } from "../lib/utils";

type LoaderProperties = React.SVGProps<SVGSVGElement>;

const LoaderArrow = ({ className, ...properties }: LoaderProperties) => {
  return (
    <RotateCwIcon
      className={cn("animate-spin w-6 h-6", className)}
      {...properties}
    />
  );
};

const LoaderRefresh = ({ className, ...properties }: LoaderProperties) => {
  return (
    <Loader className={cn("animate-spin w-6 h-6", className)} {...properties} />
  );
};

export { LoaderArrow, LoaderRefresh };
