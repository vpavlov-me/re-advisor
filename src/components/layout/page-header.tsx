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
    <>
      {/* Breadcrumb Bar */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="bg-card border-b border-border">
          <div className="container py-3">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                <Home className="h-4 w-4" />
              </Link>
              {breadcrumbs.map((item, index) => (
                <React.Fragment key={index}>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-foreground font-medium">{item.label}</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Header with Title and Actions */}
      <div className={cn("container py-8", className)}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            {description && (
              <p className="text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      </div>
    </>
  );
}
