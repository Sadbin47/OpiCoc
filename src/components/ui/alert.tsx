import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 text-sm flex gap-3 [&>svg]:shrink-0 [&>svg]:mt-0.5",
  {
    variants: {
      variant: {
        default:
          "bg-[#12151B] border-[#262B35] text-[#F1F5F9] [&>svg]:text-amber-500",
        info:
          "bg-blue-500/10 border-blue-500/30 text-blue-200 [&>svg]:text-blue-400",
        success:
          "bg-emerald-500/10 border-emerald-500/30 text-emerald-200 [&>svg]:text-emerald-400",
        warning:
          "bg-amber-500/10 border-amber-500/30 text-amber-200 [&>svg]:text-amber-400",
        destructive:
          "bg-red-500/10 border-red-500/30 text-red-200 [&>svg]:text-red-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", title, children, ...props }, ref) => {
    const Icon =
      variant === "destructive"
        ? AlertCircle
        : variant === "success"
        ? CheckCircle2
        : variant === "warning"
        ? AlertTriangle
        : Info;

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        <Icon className="h-5 w-5" />
        <div className="flex-1 space-y-1">
          {title && (
            <h5 className="font-semibold leading-none tracking-tight text-white">
              {title}
            </h5>
          )}
          <div className="text-xs sm:text-sm opacity-90 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    );
  }
);
Alert.displayName = "Alert";

export { Alert, alertVariants };
