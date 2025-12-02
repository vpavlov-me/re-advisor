import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { amount } = await request.json();

    if (!amount || amount < 1000) {
      return NextResponse.json({ error: "Minimum payout amount is $10" }, { status: 400 });
    }

    // Get Stripe Connect account from profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_account_id")
      .eq("id", user.id)
      .single();

    if (!profile?.stripe_account_id) {
      return NextResponse.json({ error: "No Stripe account connected" }, { status: 400 });
    }

    // Create payout via Stripe
    const stripe = getStripe();
    const payout = await stripe.payouts.create(
      {
        amount,
        currency: "usd",
      },
      {
        stripeAccount: profile.stripe_account_id,
      }
    );

    // Record transaction in database
    await supabase.from("transactions").insert({
      advisor_id: user.id,
      type: "payout",
      amount: `-$${(amount / 100).toFixed(2)}`,
      description: `Payout to bank account`,
      status: payout.status === "paid" ? "completed" : "pending",
      stripe_payout_id: payout.id,
      created_at: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      payoutId: payout.id,
      status: payout.status,
    });
  } catch (error) {
    console.error("Create payout error:", error);
    return NextResponse.json(
      { error: "Failed to create payout" },
      { status: 500 }
    );
  }
}
