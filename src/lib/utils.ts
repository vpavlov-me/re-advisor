import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get the base path for assets in production (GitHub Pages)
 */
export function getBasePath(): string {
  if (typeof window !== 'undefined') {
    // Client-side: check the actual URL
    return window.location.pathname.startsWith('/re-advisor') ? '/re-advisor' : '';
  }
  // Server-side: use environment
  return process.env.NODE_ENV === 'production' ? '/re-advisor' : '';
}

/**
 * Prefix a path with the base path for GitHub Pages
 */
export function assetPath(path: string): string {
  const basePath = getBasePath();
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
}
