import { NextResponse, type NextRequest } from "next/server";
import { headers } from "next/headers";
import { stripe } from "~/server/stripe";
import { env } from "~/env";

async function handler(req: NextRequest) {
  try {
    const body = await req.text();

    const signature = headers().get("stripe-signature") ?? "";

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    );

    if (event.type === "checkout.session.completed") {
      const { metadata } = event.data.object;
    }

    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong", ok: false },
      { status: 500 },
    );
  }
}
export { handler as GET, handler as POST };
