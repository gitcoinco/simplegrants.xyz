import { NextResponse, type NextRequest } from "next/server";
import { headers } from "next/headers";
import { TransferType, stripe } from "~/server/stripe";
import { env } from "~/env";
import { db } from "~/server/db";

async function handler(
  req: NextRequest,
  { params }: { params: { type?: "connect" } },
) {
  try {
    // Find the correct Stripe Webhook secret based on the route
    const whSecret =
      params.type === "connect"
        ? env.STRIPE_WEBHOOK_SECRET_CONNECT
        : env.STRIPE_WEBHOOK_SECRET;

    const body = await req.text();

    const signature = headers().get("stripe-signature") ?? "";

    const event = stripe.webhooks.constructEvent(body, signature, whSecret);

    if (event.type === "payment_intent.succeeded") {
      const { metadata, transfer_group } = event.data.object;
      if (!transfer_group) {
        throw new Error("Transfer group not found in payment");
      }

      if (metadata.type === TransferType.round) {
        await db.round.update({
          where: { id: transfer_group },
          data: {
            fundedAmount: { increment: event.data.object.amount },
          },
        });
      }
      if (metadata.type === TransferType.grant) {
        await db.contribution.updateMany({
          where: { transferGroup: transfer_group },
          data: { status: "success" },
        });
      }
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
