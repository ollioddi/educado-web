import {
  ClipboardCopyIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "lucide-react";
import React, { useState, useMemo } from "react";
import { toast } from "sonner";

import { cn } from "../lib/utils";

import { Button } from "./shadcn/button";

interface JsonCardProperties {
  object: unknown;
  title?: string;
  defaultOpen?: boolean;
  className?: string;
}

const JsonCard = ({
  object,
  title,
  defaultOpen = false,
  className,
}: JsonCardProperties) => {
  const [isCollapsed, setIsCollapsed] = useState(!defaultOpen);

  const memoObjectString = useMemo(
    () => JSON.stringify(object, undefined, 2),
    [object]
  );

  if (!object) {
    return;
  }

  const handleCopy = () => {
    void navigator.clipboard.writeText(memoObjectString);
    toast.success("Copied to clipboard");
  };

  const toggleCollapse = (event: React.MouseEvent) => {
    // Prevent the click event from bubbling up to the parent
    // Can trigger form submission if inside a form
    event.stopPropagation();
    event.preventDefault();
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={cn("text-left max-w-lg", className)}>
      <div className="bg-secondary rounded-md p-4 shadow-md w-full">
        <div className="w-full flex justify-between items-center">
          <h4>{title ?? "JSON"}</h4>
          <div className="flex flex-row gap-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCopy}
              aria-label="Copy to clipboard"
            >
              <ClipboardCopyIcon className="w-4 h-4 text-primary" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleCollapse}
              aria-label={isCollapsed ? "Expand" : "Collapse"}
            >
              {isCollapsed ? (
                <ChevronDownIcon className="w-4 h-4" />
              ) : (
                <ChevronUpIcon className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
        {!isCollapsed && (
          <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
            {memoObjectString}
          </code>
        )}
      </div>
    </div>
  );
};

export default JsonCard;
