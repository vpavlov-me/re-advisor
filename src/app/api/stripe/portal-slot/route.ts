import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createCheckoutSession, PLANS } from "@/lib/stripe";

export async function POST() {
  try {
    const supabase = await createServerSupabaseClient();
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user has premium subscription
    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("plan_id, stripe_customer_id")
      .eq("advisor_id", user.id)
      .single();

    if (!subscription || subscription.plan_id !== "premium") {
      return NextResponse.json({ error: "Premium subscription required" }, { status: 400 });
    }

    // Get customer ID
    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .single();

    if (!profile?.stripe_customer_id) {
      return NextResponse.json({ error: "No Stripe customer found" }, { status: 400 });
    }

    // Create checkout session for additional portal slot
    const additionalPortalPriceId = process.env.STRIPE_ADDITIONAL_PORTAL_PRICE_ID;
    if (!additionalPortalPriceId) {
      return NextResponse.json({ error: "Portal slot price not configured" }, { status: 500 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const session = await createCheckoutSession(
      profile.stripe_customer_id,
      additionalPortalPriceId,
      `${baseUrl}/subscription?portal_added=true`,
      `${baseUrl}/subscription?canceled=true`
    );

    return NextResponse.json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    console.error("Purchase portal slot error:", error);
    return NextResponse.json(
      { error: "Failed to purchase portal slot" },
      { status: 500 }
    );
  }
}
