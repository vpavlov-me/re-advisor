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

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  
  // Check if current route is an auth route
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  // Don't show header/footer on auth pages
  if (isAuthRoute) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <AppHeader />
      <main className="flex-1">{children}</main>
      <AppFooter />
    </>
  );
}
