import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe";

export async function POST() {
  try {
    const supabase = await createServerSupabaseClient();
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_account_id, first_name, last_name, email")
      .eq("id", user.id)
      .single();

    const stripe = getStripe();
    let accountId = profile?.stripe_account_id;

    // Create Stripe Connect account if doesn't exist
    if (!accountId) {
      const account = await stripe.accounts.create({
        type: "express",
        country: "US",
        email: user.email,
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
        business_profile: {
          name: `${profile?.first_name || ""} ${profile?.last_name || ""}`.trim() || "Advisor",
        },
        metadata: {
          userId: user.id,
        },
      });

      accountId = account.id;

      // Save account ID to profile
      await supabase
        .from("profiles")
        .update({
          stripe_account_id: accountId,
          stripe_account_status: "initiated",
        })
        .eq("id", user.id);
    }

    // Create account link for onboarding
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${baseUrl}/payments?refresh=true`,
      return_url: `${baseUrl}/payments?success=true`,
      type: "account_onboarding",
    });

    return NextResponse.json({
      success: true,
      url: accountLink.url,
    });
  } catch (error) {
    console.error("Stripe Connect onboarding error:", error);
    return NextResponse.json(
      { error: "Failed to start onboarding" },
      { status: 500 }
    );
  }
}
