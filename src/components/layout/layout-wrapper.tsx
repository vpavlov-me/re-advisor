"use client";

import { usePathname } from "next/navigation";
import { AppHeader } from "./app-header";
import { AppFooter } from "./app-footer";

// Routes that should not show header/footer (auth pages)
const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/verify-email",
  "/auth/callback",
];

// Routes that should not show footer (full-height pages)
const noFooterRoutes = [
  "/messages",
];

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  
  // Check if current route is an auth route
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  
  // Check if current route should hide footer
  const hideFooter = noFooterRoutes.some(route => pathname.startsWith(route));

  // Don't show header/footer on auth pages
  if (isAuthRoute) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-1 flex flex-col">{children}</main>
      {!hideFooter && <AppFooter />}
    </div>
  );
}
