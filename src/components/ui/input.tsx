import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean | string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, startIcon, endIcon, disabled, ...props }, ref) => {
    return (
      <div className="relative w-full flex items-center">
        {startIcon && (
          <div className="absolute left-3 flex items-center pointer-events-none text-[#64748B]">
            {startIcon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-[#262B35] bg-[#12151B] px-3 py-2 text-sm text-[#F1F5F9] shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#64748B] outline-none",
            "hover:border-[#3B4252]",
            "focus-visible:border-amber-500 focus-visible:ring-1 focus-visible:ring-amber-500",
            "disabled:cursor-not-allowed disabled:opacity-45 disabled:bg-[#0B0D11]",
            error && "border-red-500/80 focus-visible:border-red-500 focus-visible:ring-red-500/50",
            startIcon && "pl-10",
            endIcon && "pr-10",
            className
          )}
          ref={ref}
          disabled={disabled}
          aria-invalid={error ? "true" : undefined}
          {...props}
        />
        {endIcon && (
          <div className="absolute right-3 flex items-center text-[#64748B]">
            {endIcon}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
