"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "./auth-provider";

// Routes that don't require authentication
const publicRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/verify-email",
  "/auth/callback",
];

// Routes that require authentication
const protectedRoutes = [
  "/",
  "/messages",
  "/consultations",
  "/families",
  "/knowledge",
  "/notifications",
  "/profile",
  "/settings",
  "/payments",
  "/services",
  "/subscription",
  "/onboarding",
  "/family-onboarding",
];

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname === route || pathname.startsWith(route + "/")
  );

  useEffect(() => {
    if (loading) return;

    // If not authenticated and trying to access protected route
    if (!isAuthenticated && isProtectedRoute) {
      // Store the intended destination
      const returnUrl = encodeURIComponent(pathname);
      router.push(`/auth/login?returnUrl=${returnUrl}`);
      return;
    }

    // If authenticated and trying to access auth pages (except callback)
    if (isAuthenticated && isPublicRoute && pathname !== "/auth/callback") {
      router.push("/");
      return;
    }
  }, [isAuthenticated, loading, pathname, router, isPublicRoute, isProtectedRoute]);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If on protected route and not authenticated, show loading (will redirect)
  if (isProtectedRoute && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // If on public route (auth pages) and authenticated, show loading (will redirect)
  if (isPublicRoute && isAuthenticated && pathname !== "/auth/callback") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// HOC for protecting individual pages
export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        const returnUrl = encodeURIComponent(pathname);
        router.push(`/auth/login?returnUrl=${returnUrl}`);
      }
    }, [isAuthenticated, loading, router, pathname]);

    if (loading) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      );
    }

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
