import Stripe from "stripe";

// Lazy initialization of Stripe instance
let stripeInstance: Stripe | null = null;

export const getStripe = () => {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-11-17.clover",
      typescript: true,
    });
  }
  return stripeInstance;
};

// Export stripe getter for backwards compatibility
export const stripe = {
  get customers() {
    return getStripe().customers;
  },
  get subscriptions() {
    return getStripe().subscriptions;
  },
  get checkout() {
    return getStripe().checkout;
  },
  get billingPortal() {
    return getStripe().billingPortal;
  },
  get invoices() {
    return getStripe().invoices;
  },
  get webhooks() {
    return getStripe().webhooks;
  },
};

// Subscription plans
export const PLANS = {
  starter: {
    id: "starter",
    name: "Starter",
    price: 49,
    priceId: process.env.STRIPE_STARTER_PRICE_ID!,
    features: [
      "Up to 5 family clients",
      "10 consultations/month",
      "Basic messaging",
      "5GB storage",
      "Email support",
    ],
    limits: {
      families: 5,
      consultations: 10,
      storage: 5, // GB
    },
  },
  professional: {
    id: "professional",
    name: "Professional",
    price: 99,
    priceId: process.env.STRIPE_PROFESSIONAL_PRICE_ID!,
    features: [
      "Up to 15 family clients",
      "20 consultations/month",
      "Priority messaging",
      "10GB storage",
      "Priority support",
      "Analytics dashboard",
    ],
    limits: {
      families: 15,
      consultations: 20,
      storage: 10,
    },
  },
  enterprise: {
    id: "enterprise",
    name: "Enterprise",
    price: 249,
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID!,
    features: [
      "Unlimited family clients",
      "Unlimited consultations",
      "Priority messaging",
      "50GB storage",
      "Dedicated support",
      "Advanced analytics",
      "Custom branding",
      "API access",
    ],
    limits: {
      families: -1, // unlimited
      consultations: -1,
      storage: 50,
    },
  },
} as const;

export type PlanId = keyof typeof PLANS;

// Create a Stripe customer
export async function createCustomer(email: string, name: string, userId: string) {
  const customer = await stripe.customers.create({
    email,
    name,
    metadata: {
      userId,
    },
  });
  return customer;
}

// Get customer by ID
export async function getCustomer(customerId: string) {
  const customer = await stripe.customers.retrieve(customerId);
  return customer;
}

// Create checkout session for subscription
export async function createCheckoutSession(
  customerId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string
) {
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: successUrl,
    cancel_url: cancelUrl,
    subscription_data: {
      trial_period_days: 14, // 14-day free trial
    },
  });
  return session;
}

// Create customer portal session
export async function createPortalSession(customerId: string, returnUrl: string) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
  return session;
}

// Get subscription
export async function getSubscription(subscriptionId: string) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  return subscription;
}

// Cancel subscription
export async function cancelSubscription(subscriptionId: string) {
  const subscription = await stripe.subscriptions.cancel(subscriptionId);
  return subscription;
}

// Update subscription (change plan)
export async function updateSubscription(subscriptionId: string, newPriceId: string) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  
  const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
    items: [
      {
        id: subscription.items.data[0].id,
        price: newPriceId,
      },
    ],
    proration_behavior: "create_prorations",
  });
  
  return updatedSubscription;
}

// Get invoices for customer
export async function getInvoices(customerId: string, limit = 10) {
  const invoices = await stripe.invoices.list({
    customer: customerId,
    limit,
  });
  return invoices.data;
}

// Construct webhook event
export function constructWebhookEvent(payload: string | Buffer, signature: string) {
  return stripe.webhooks.constructEvent(
    payload,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  );
}
