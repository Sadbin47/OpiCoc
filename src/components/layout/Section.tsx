import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sectionVariants = cva("w-full relative", {
  variants: {
    spacing: {
      none: "py-0",
      sm: "py-6 sm:py-8",
      default: "py-10 sm:py-14 lg:py-16",
      lg: "py-16 sm:py-20 lg:py-24",
    },
    surface: {
      default: "bg-transparent",
      card: "bg-[#12151B] border-y border-[#262B35]",
      subtle: "bg-[#0E1015] border-y border-[#1E232B]",
    },
  },
  defaultVariants: {
    spacing: "default",
    surface: "default",
  },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  as?: React.ElementType;
}

export function Section({
  as: Component = "section",
  className,
  spacing,
  surface,
  children,
  ...props
}: SectionProps) {
  return (
    <Component
      className={cn(sectionVariants({ spacing, surface }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}
