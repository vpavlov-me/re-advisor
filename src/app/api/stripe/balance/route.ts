import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe";

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get Stripe Connect account from profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_account_id")
      .eq("id", user.id)
      .single();

    if (!profile?.stripe_account_id) {
      // No Stripe Connect account, return zero balance
      return NextResponse.json({
        available: 0,
        pending: 0,
        currency: "usd",
      });
    }

    // Get balance from Stripe Connect account
    const stripe = getStripe();
    const balance = await stripe.balance.retrieve({
      stripeAccount: profile.stripe_account_id,
    });

    // Find USD balance (or first available)
    const availableBalance = balance.available.find(b => b.currency === 'usd') || balance.available[0];
    const pendingBalance = balance.pending.find(b => b.currency === 'usd') || balance.pending[0];

    return NextResponse.json({
      available: availableBalance?.amount || 0,
      pending: pendingBalance?.amount || 0,
      currency: availableBalance?.currency || "usd",
    });
  } catch (error) {
    console.error("Get balance error:", error);
    // Return zero balance on error (graceful degradation)
    return NextResponse.json({
      available: 0,
      pending: 0,
      currency: "usd",
    });
  }
}
