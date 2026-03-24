import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export const getStripe = (): Stripe => {
  if (!stripeClient) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      throw new Error("Missing STRIPE_SECRET_KEY environment variable");
    }
    stripeClient = new Stripe(secretKey);
  }
  return stripeClient;
};

// Export for backward compatibility
export const stripe = {
  get client() {
    return getStripe();
  }
};

export async function createCheckoutSession(
  priceId: string,
  customerId?: string,
  customerEmail?: string
) {
  const stripeInstance = getStripe();
  const session = await stripeInstance.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    ...(customerId ? { customer: customerId } : { customer_email: customerEmail! }),
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
  });

  return session;
}

export async function createCustomer(email: string, name?: string) {
  return getStripe().customers.create({ email, name });
}

export async function getSubscription(subscriptionId: string) {
  return getStripe().subscriptions.retrieve(subscriptionId);
}
