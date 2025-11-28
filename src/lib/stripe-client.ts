import { loadStripe } from "@stripe/stripe-js";
import type { Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

// Redirect to checkout - opens Stripe hosted checkout page
export function redirectToCheckout(checkoutUrl: string) {
  // In Stripe's latest version, we redirect directly to the checkout URL
  window.location.href = checkoutUrl;
}

// Alternative: Redirect using sessionId (for embedded checkout)
export async function redirectToCheckoutSession(sessionId: string) {
  const stripe = await getStripe();
  if (!stripe) {
    throw new Error("Failed to load Stripe");
  }
  
  // Use type assertion for legacy API
  const stripeWithLegacy = stripe as Stripe & {
    redirectToCheckout?: (options: { sessionId: string }) => Promise<{ error?: Error }>;
  };
  
  if (stripeWithLegacy.redirectToCheckout) {
    const { error } = await stripeWithLegacy.redirectToCheckout({ sessionId });
    if (error) {
      throw error;
    }
  } else {
    // Fallback: fetch session URL from API
    console.warn("redirectToCheckout not available, use checkout URL directly");
  }
}
