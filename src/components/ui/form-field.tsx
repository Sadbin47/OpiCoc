import * as React from "react";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FormFieldProps {
  id: string;
  label?: string;
  description?: string;
  error?: string | boolean;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  id,
  label,
  description,
  error,
  required,
  children,
  className,
}: FormFieldProps) {
  const errorId = `${id}-error`;
  const descId = `${id}-description`;

  return (
    <div className={cn("space-y-1.5 w-full", className)}>
      {label && (
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
      )}

      {children}

      {description && !error && (
        <p id={descId} className="text-xs text-[#94A3B8]">
          {description}
        </p>
      )}

      {error && typeof error === "string" && (
        <p
          id={errorId}
          className="text-xs text-red-400 flex items-center gap-1 font-medium mt-1"
          role="alert"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
