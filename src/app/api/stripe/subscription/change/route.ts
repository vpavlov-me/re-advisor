import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { updateSubscription, PLANS, PlanId } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { planId } = await request.json();
    
    if (!planId || !PLANS[planId as PlanId]) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const newPlan = PLANS[planId as PlanId];

    // Get subscription from database
    const { data: subscription, error: subError } = await supabase
      .from("subscriptions")
      .select("stripe_subscription_id, plan_id")
      .eq("advisor_id", user.id)
      .single();

    if (subError || !subscription?.stripe_subscription_id) {
      return NextResponse.json({ error: "No active subscription found" }, { status: 404 });
    }

    // Update subscription in Stripe
    await updateSubscription(subscription.stripe_subscription_id, newPlan.priceId);

    // Update subscription in database
    await supabase
      .from("subscriptions")
      .update({
        plan_id: planId,
        updated_at: new Date().toISOString(),
      })
      .eq("advisor_id", user.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Change plan error:", error);
    return NextResponse.json(
      { error: "Failed to change plan" },
      { status: 500 }
    );
  }
}
