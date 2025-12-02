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
  standard: {
    id: "standard",
    name: "Standard Consultant",
    price: 49,
    priceId: process.env.STRIPE_STANDARD_PRICE_ID || process.env.STRIPE_STARTER_PRICE_ID!,
    features: [
      "Доступ к маркетплейсу семей",
      "Неограниченные консультации",
      "Профиль в каталоге консультантов",
      "Базовая аналитика",
      "Email поддержка",
    ],
    limits: {
      families: -1,
      consultations: -1,
      storage: 5, // GB
      familyPortals: 0,
    },
  },
  premium: {
    id: "premium",
    name: "Premium Consultant",
    price: 99,
    priceId: process.env.STRIPE_PREMIUM_PRICE_ID || process.env.STRIPE_PROFESSIONAL_PRICE_ID!,
    features: [
      "Всё из Standard плана",
      "До 3 Family Portals включено",
      "Приоритетная поддержка",
      "Расширенная аналитика",
      "Кастомный брендинг",
    ],
    limits: {
      families: -1,
      consultations: -1,
      storage: 10,
      familyPortals: 3,
    },
  },
  // Legacy plan aliases for backwards compatibility
  starter: {
    id: "starter",
    name: "Standard Consultant",
    price: 49,
    priceId: process.env.STRIPE_STANDARD_PRICE_ID || process.env.STRIPE_STARTER_PRICE_ID!,
    features: [],
    limits: { families: -1, consultations: -1, storage: 5, familyPortals: 0 },
  },
  professional: {
    id: "professional",
    name: "Premium Consultant",
    price: 99,
    priceId: process.env.STRIPE_PREMIUM_PRICE_ID || process.env.STRIPE_PROFESSIONAL_PRICE_ID!,
    features: [],
    limits: { families: -1, consultations: -1, storage: 10, familyPortals: 3 },
  },
  enterprise: {
    id: "enterprise",
    name: "Premium Consultant",
    price: 99,
    priceId: process.env.STRIPE_PREMIUM_PRICE_ID || process.env.STRIPE_ENTERPRISE_PRICE_ID!,
    features: [],
    limits: { families: -1, consultations: -1, storage: 50, familyPortals: 3 },
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
