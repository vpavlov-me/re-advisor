"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const spinnerVariants = cva("animate-spin", {
  variants: {
    size: {
      xs: "h-3 w-3",
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-8 w-8",
      xl: "h-12 w-12",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

interface SpinnerProps
  extends React.HTMLAttributes<SVGSVGElement>,
    VariantProps<typeof spinnerVariants> {}

const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <Loader2
        ref={ref}
        className={cn(spinnerVariants({ size }), className)}
        {...props}
      />
    );
  }
);
Spinner.displayName = "Spinner";

// Dots spinner variant for typing indicators etc.
const dotsSpinnerVariants = cva("flex items-center gap-1", {
  variants: {
    size: {
      xs: "[&>span]:h-1 [&>span]:w-1",
      sm: "[&>span]:h-1.5 [&>span]:w-1.5",
      md: "[&>span]:h-2 [&>span]:w-2",
      lg: "[&>span]:h-3 [&>span]:w-3",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface SpinnerDotsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dotsSpinnerVariants> {}

const SpinnerDots = React.forwardRef<HTMLDivElement, SpinnerDotsProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(dotsSpinnerVariants({ size }), className)}
        {...props}
      >
        <span className="rounded-full bg-current animate-bounce [animation-delay:0ms]" />
        <span className="rounded-full bg-current animate-bounce [animation-delay:150ms]" />
        <span className="rounded-full bg-current animate-bounce [animation-delay:300ms]" />
      </div>
    );
  }
);
SpinnerDots.displayName = "SpinnerDots";

// Inline spinner for buttons (border-based)
interface ButtonSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md";
}

const ButtonSpinner = React.forwardRef<HTMLDivElement, ButtonSpinnerProps>(
  ({ className, size = "sm", ...props }, ref) => {
    const sizeClasses = size === "sm" ? "h-4 w-4" : "h-5 w-5";
    return (
      <div
        ref={ref}
        className={cn(
          "animate-spin rounded-full border-2 border-current border-t-transparent",
          sizeClasses,
          className
        )}
        {...props}
      />
    );
  }
);
ButtonSpinner.displayName = "ButtonSpinner";

export { Spinner, SpinnerDots, ButtonSpinner, spinnerVariants, dotsSpinnerVariants };
