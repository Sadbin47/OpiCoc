import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0D11] disabled:pointer-events-none disabled:opacity-45 select-none active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-[#F59E0B] text-[#090A0D] font-semibold hover:bg-[#D97706] shadow-sm",
        secondary:
          "bg-[#1A1E26] text-[#F1F5F9] hover:bg-[#262B35] border border-[#262B35]",
        outline:
          "border border-[#262B35] bg-transparent text-[#F1F5F9] hover:bg-[#1A1E26] hover:border-[#3B4252]",
        ghost:
          "text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#1A1E26]",
        destructive:
          "bg-[#EF4444] text-white hover:bg-[#DC2626] font-semibold",
        tactical:
          "bg-[#3B82F6] text-white font-semibold hover:bg-[#2563EB] shadow-sm",
        link:
          "text-[#F59E0B] underline-offset-4 hover:underline p-0 h-auto active:scale-100",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-6 text-base font-semibold",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-current" />
            <span>{children}</span>
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
