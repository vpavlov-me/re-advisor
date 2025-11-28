"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Verifying your account...");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the hash from the URL (Supabase adds tokens as hash fragments)
        const hash = window.location.hash;
        
        // Parse the hash params
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get("access_token");
        const refreshToken = params.get("refresh_token");
        const type = params.get("type");
        const error = params.get("error");
        const errorDescription = params.get("error_description");

        // Handle errors from Supabase
        if (error) {
          setStatus("error");
          setMessage(errorDescription || "Authentication failed");
          return;
        }

        // If we have tokens, set the session
        if (accessToken && refreshToken) {
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (sessionError) {
            setStatus("error");
            setMessage(sessionError.message);
            return;
          }

          // Get the user to check their status
          const { data: { user } } = await supabase.auth.getUser();

          if (user) {
            // Check if this is a password recovery
            if (type === "recovery") {
              setStatus("success");
              setMessage("Redirecting to reset password...");
              setTimeout(() => {
                router.push("/auth/reset-password");
              }, 1000);
              return;
            }

            // Check if this is email verification
            if (type === "signup" || type === "magiclink") {
              // Check if profile exists, if not create it
              const { data: profile } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", user.id)
                .single();

              if (!profile) {
                // Create profile from user metadata
                const metadata = user.user_metadata || {};
                await supabase.from("profiles").insert({
                  id: user.id,
                  email: user.email,
                  first_name: metadata.first_name || "",
                  last_name: metadata.last_name || "",
                  phone: metadata.phone || "",
                  company: metadata.company || "",
                  is_first_login: true,
                  onboarding_progress: 0,
                  profile_status: "draft",
                });
              }

              setStatus("success");
              setMessage("Email verified! Redirecting...");
              setTimeout(() => {
                router.push("/");
              }, 1500);
              return;
            }

            // OAuth login success
            setStatus("success");
            setMessage("Signed in successfully! Redirecting...");
            
            // Check if profile exists for OAuth users
            const { data: profile } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", user.id)
              .single();

            if (!profile) {
              // Create profile from OAuth metadata
              const metadata = user.user_metadata || {};
              const fullName = metadata.full_name || metadata.name || "";
              const nameParts = fullName.split(" ");
              
              await supabase.from("profiles").insert({
                id: user.id,
                email: user.email,
                first_name: metadata.first_name || nameParts[0] || "",
                last_name: metadata.last_name || nameParts.slice(1).join(" ") || "",
                avatar_url: metadata.avatar_url || metadata.picture || "",
                is_first_login: true,
                onboarding_progress: 0,
                profile_status: "draft",
              });
            }

            setTimeout(() => {
              router.push("/");
            }, 1500);
            return;
          }
        }

        // Fallback - try to get the session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          setStatus("success");
          setMessage("Redirecting to dashboard...");
          setTimeout(() => {
            router.push("/");
          }, 1000);
        } else {
          setStatus("error");
          setMessage("Could not verify your account. Please try again.");
        }
      } catch (err) {
        console.error("Auth callback error:", err);
        setStatus("error");
        setMessage("An unexpected error occurred.");
      }
    };

    handleCallback();
  }, [router]);

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
