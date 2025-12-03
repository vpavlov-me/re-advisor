"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * This component handles authentication tokens passed in URL hash fragments.
 * 
 * Supabase Magic Links redirect to the site with tokens in the hash fragment:
 * https://example.com/#access_token=xxx&refresh_token=yyy&type=magiclink
 * 
 * Since the hash fragment is not sent to the server, middleware cannot intercept it.
 * This client-side component detects these tokens and redirects to /auth/callback
 * where they can be properly processed.
 */
export function HashHandler() {
  const router = useRouter();

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;

    const hash = window.location.hash;
    
    // Check if the hash contains Supabase auth tokens
    if (hash && hash.includes("access_token")) {
      // Extract the hash fragment and redirect to callback page
      const callbackUrl = `/auth/callback${hash}`;
      console.log("[HashHandler] Detected auth tokens in hash, redirecting to callback...");
      router.replace(callbackUrl);
    }
  }, [router]);

  return null;
}
