"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success: "group-[.toaster]:border-green-500 group-[.toaster]:bg-green-50 group-[.toaster]:text-green-900",
          error: "group-[.toaster]:border-red-500 group-[.toaster]:bg-red-50 group-[.toaster]:text-red-900",
          warning: "group-[.toaster]:border-yellow-500 group-[.toaster]:bg-yellow-50 group-[.toaster]:text-yellow-900",
          info: "group-[.toaster]:border-blue-500 group-[.toaster]:bg-blue-50 group-[.toaster]:text-blue-900",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
