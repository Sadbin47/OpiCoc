import * as React from "react";
import { cn } from "@/lib/utils";

export interface SkipToContentProps
  extends React.HTMLAttributes<HTMLAnchorElement> {
  targetId?: string;
}

export function SkipToContent({
  targetId = "main-content",
  className,
  ...props
}: SkipToContentProps) {
  return (
    <a
      href={`#${targetId}`}
      className={cn(
        "sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50",
        "focus:px-4 focus:py-2 focus:bg-amber-500 focus:text-black focus:font-bold focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-300",
        className
      )}
      {...props}
    >
      Skip to main content
    </a>
  );
}
