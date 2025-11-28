"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("border-b bg-background", className)}>
      <div className="container py-4 space-y-2">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              <Home className="h-4 w-4" />
            </Link>
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={index}>
                <ChevronRight className="h-3.5 w-3.5" />
                {item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-foreground font-medium">{item.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Title and Actions */}
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      </div>
    </div>
  );
}
