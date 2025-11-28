import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { constructWebhookEvent, stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

// Lazy initialization of admin Supabase client
function getSupabaseAdmin() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Supabase environment variables are not set");
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event;

  try {
    event = constructWebhookEvent(body, signature);
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    const supabaseAdmin = getSupabaseAdmin();
    
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const customerId = session.customer as string;
        const subscriptionId = session.subscription as string;

        // Get user ID from customer metadata
        const customer = await stripe.customers.retrieve(customerId);
        if (customer.deleted) break;
        
        const userId = customer.metadata.userId;
        if (!userId) break;

        // Get subscription details
        const subscriptionData = await stripe.subscriptions.retrieve(subscriptionId) as Stripe.Subscription;
        const subscriptionItem = subscriptionData.items.data[0];
        const priceId = subscriptionItem.price.id;

        // Determine plan from price ID
        let planId = "starter";
        if (priceId === process.env.STRIPE_PROFESSIONAL_PRICE_ID) {
          planId = "professional";
        } else if (priceId === process.env.STRIPE_ENTERPRISE_PRICE_ID) {
          planId = "enterprise";
        }

        // Upsert subscription in database
        await supabaseAdmin
          .from("subscriptions")
          .upsert({
            advisor_id: userId,
            plan_id: planId,
            status: "active",
            stripe_subscription_id: subscriptionId,
            stripe_customer_id: customerId,
            current_period_start: new Date(subscriptionItem.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscriptionItem.current_period_end * 1000).toISOString(),
            updated_at: new Date().toISOString(),
          }, { onConflict: "advisor_id" });

        break;
      }

      case "customer.subscription.updated": {
        const subscriptionEvent = event.data.object as Stripe.Subscription;
        const customerId = subscriptionEvent.customer as string;

        // Get user ID from customer
        const customer = await stripe.customers.retrieve(customerId);
        if (customer.deleted) break;
        
        const userId = customer.metadata.userId;
        if (!userId) break;

        const subscriptionItem = subscriptionEvent.items.data[0];
        const priceId = subscriptionItem.price.id;

        // Determine plan from price ID
        let planId = "starter";
        if (priceId === process.env.STRIPE_PROFESSIONAL_PRICE_ID) {
          planId = "professional";
        } else if (priceId === process.env.STRIPE_ENTERPRISE_PRICE_ID) {
          planId = "enterprise";
        }

        // Update subscription in database
        await supabaseAdmin
          .from("subscriptions")
          .update({
            plan_id: planId,
            status: subscriptionEvent.status === "active" ? "active" : subscriptionEvent.status,
            current_period_start: new Date(subscriptionItem.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscriptionItem.current_period_end * 1000).toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("advisor_id", userId);

        break;
      }

      case "customer.subscription.deleted": {
        const deletedSubscription = event.data.object as Stripe.Subscription;
        const customerId = deletedSubscription.customer as string;

        // Get user ID from customer
        const customer = await stripe.customers.retrieve(customerId);
        if (customer.deleted) break;
        
        const userId = customer.metadata.userId;
        if (!userId) break;

        // Update subscription status
        await supabaseAdmin
          .from("subscriptions")
          .update({
            status: "cancelled",
            updated_at: new Date().toISOString(),
          })
          .eq("advisor_id", userId);

        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object;
        const customerId = invoice.customer as string;

        // Get user ID from customer
        const customer = await stripe.customers.retrieve(customerId);
        if (customer.deleted) break;
        
        const userId = customer.metadata.userId;
        if (!userId) break;

        // Update subscription status
        await supabaseAdmin
          .from("subscriptions")
          .update({
            status: "past_due",
            updated_at: new Date().toISOString(),
          })
          .eq("advisor_id", userId);

        // Create notification
        await supabaseAdmin
          .from("notifications")
          .insert({
            user_id: userId,
            type: "alert",
            title: "Payment Failed",
            description: "Your subscription payment failed. Please update your payment method.",
          });

        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

// Disable body parsing for raw body access
export const config = {
  api: {
    bodyParser: false,
  },
};
