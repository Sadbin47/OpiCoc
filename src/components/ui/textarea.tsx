import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean | string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, disabled, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-[#262B35] bg-[#12151B] px-3 py-2 text-sm text-[#F1F5F9] shadow-sm transition-colors placeholder:text-[#64748B] outline-none",
          "hover:border-[#3B4252]",
          "focus-visible:border-amber-500 focus-visible:ring-1 focus-visible:ring-amber-500",
          "disabled:cursor-not-allowed disabled:opacity-45 disabled:bg-[#0B0D11]",
          error && "border-red-500/80 focus-visible:border-red-500 focus-visible:ring-red-500/50",
          className
        )}
        ref={ref}
        disabled={disabled}
        aria-invalid={error ? "true" : undefined}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
