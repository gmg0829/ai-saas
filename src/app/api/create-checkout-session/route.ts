import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";

export async function POST() {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const priceId = process.env.STRIPE_PRICE_ID_PRO!;

    const session = await createCheckoutSession(priceId);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
