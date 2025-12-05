"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { 
  getCurrentUser, 
  getSession, 
  exchangeCodeForSession, 
  setSession as setAuthSession 
} from "@/lib/auth";
import { getProfile, createProfile } from "@/lib/supabase/profile";
import { Suspense } from "react";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Verifying your account...");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Check for error in URL params
        const urlError = searchParams.get("error");
        const errorDescription = searchParams.get("error_description");
        if (urlError) {
          setStatus("error");
          setMessage(errorDescription || urlError);
          return;
        }

        // Check for code (OAuth flow - PKCE)
        const code = searchParams.get("code");
        
        // Get the hash from the URL (email verification sends tokens as hash fragments)
        const hash = window.location.hash;
        
        // Parse the hash params
        const hashParams = new URLSearchParams(hash.substring(1));
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");
        const type = hashParams.get("type");
        const hashError = hashParams.get("error");
        const hashErrorDescription = hashParams.get("error_description");

        // Handle errors from Supabase hash params
        if (hashError) {
          setStatus("error");
          setMessage(hashErrorDescription || "Authentication failed");
          return;
        }

        // Handle code-based OAuth flow (PKCE)
        if (code) {
          const { data, error: exchangeError } = await exchangeCodeForSession(code);
          
          if (exchangeError) {
            setStatus("error");
            setMessage(exchangeError.message);
            return;
          }

          if (data.user) {
            // Clear URL params
            window.history.replaceState(null, '', window.location.pathname);
            
            // Check profile and redirect
            await handleUserRedirect(data.user.id);
            return;
          }
        }

        // Handle hash-based token flow (email verification)
        if (accessToken && refreshToken) {
          const { error: sessionError } = await setAuthSession(accessToken, refreshToken);

          if (sessionError) {
            setStatus("error");
            setMessage(sessionError.message);
            return;
          }

          // Clear the hash to prevent token reuse
          window.history.replaceState(null, '', window.location.pathname);

          // Get the user
          const user = await getCurrentUser();

          if (user) {
            // Check if this is a password recovery
            if (type === "recovery") {
              setStatus("success");
              setMessage("Redirecting to reset password...");
              setTimeout(() => {
                router.push("/auth/reset-password");
              }, 500);
              return;
            }

            // For signup/email verification
            await handleUserRedirect(user.id, type === "signup");
            return;
          }
        }

        // No code or tokens - check if we already have a session
        const session = await getSession();
        
        if (session) {
          setStatus("success");
          setMessage("Redirecting to dashboard...");
          setTimeout(() => {
            router.push("/");
          }, 1000);
        } else {
          // No session and no auth data - might be a direct visit
          setStatus("error");
          setMessage("No authentication data found. Please try logging in again.");
        }
      } catch (err) {
        console.error("Auth callback error:", err);
        setStatus("error");
        setMessage("An unexpected error occurred.");
      }
    };

    // Helper function to handle user redirect based on profile
    const handleUserRedirect = async (userId: string, isSignup = false) => {
      try {
        // Check profile using abstraction
        const profile = await getProfile();

        // Determine redirect destination
        const shouldOnboard = !profile?.onboarding_completed || profile?.is_first_login;
        const destination = shouldOnboard ? "/onboarding" : "/";

        setStatus("success");
        setMessage(isSignup ? "Email verified! Redirecting..." : "Signed in successfully! Redirecting...");
        
        setTimeout(() => {
          router.push(destination);
        }, 1500);
      } catch (profileError: any) {
        // Profile doesn't exist - create it
        if (profileError?.code === 'PGRST116') {
          const user = await getCurrentUser();
          const metadata = user?.user_metadata || {};
          const fullName = metadata.full_name || metadata.name || '';
          const nameParts = fullName.split(' ');
          
          await createProfile({
            first_name: metadata.first_name || nameParts[0] || null,
            last_name: metadata.last_name || nameParts.slice(1).join(' ') || null,
            phone: metadata.phone || null,
            company: metadata.company || null,
            avatar_url: metadata.avatar_url || metadata.picture || null,
          });
          
          // New user goes to onboarding
          setStatus("success");
          setMessage(isSignup ? "Email verified! Redirecting..." : "Signed in successfully! Redirecting...");
          setTimeout(() => {
            router.push("/onboarding");
          }, 1500);
          return;
        }
        throw profileError;
      }
    };

    handleCallback();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="text-center">
        {status === "loading" && (
          <>
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">{message}</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-lg text-foreground font-medium">{message}</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <XCircle className="h-8 w-8 text-destructive" />
            </div>
            <p className="text-lg text-foreground font-medium mb-2">Verification Failed</p>
            <p className="text-muted-foreground mb-4">{message}</p>
            <a 
              href="/auth/login" 
              className="text-primary hover:underline"
            >
              Return to sign in
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Verifying your account...</p>
        </div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}
