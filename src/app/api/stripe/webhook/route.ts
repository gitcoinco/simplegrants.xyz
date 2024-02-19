import { NextResponse, type NextRequest } from "next/server";
import { headers } from "next/headers";
import { TransferType, stripe } from "~/server/stripe";
import { env } from "~/env";
import { db } from "~/server/db";

async function handler(req: NextRequest) {
  try {
    const body = await req.text();

    const signature = headers().get("stripe-signature") ?? "";

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    );

    Object.assign(event.data.object, {
      metadata: { type: "grant", userId: "clsncr3xx000010bbf8i4m4lo" },
      transfer_group: "LJMQ2Qo7Au2wbdbbSs5cl",
    });

    if (event.type === "payment_intent.succeeded") {
      const { metadata, transfer_group } = event.data.object;

      if (metadata.type === TransferType.grant) {
        if (!transfer_group) {
          throw new Error("Transfer group not found in payment");
        }

        const contributions = await db.contribution.findMany({
          where: { transferGroup: transfer_group },
          include: { grant: true },
        });

        console.log(contributions);

        /*
        The payment is not available in the balance right away.
        Will the platform hold the payments until available?
        There's a balance updated webhook. 

        Another option is to top up the balance to cover until tx is approved.

        */
        // await Promise.all(
        //   contributions.map((contribution) =>
        //     stripe.transfers.create({
        //       amount: contribution.amount * 100,
        //       currency: "usd",
        //       destination: contribution.grant.stripeAccount!,
        //       transfer_group,
        //     }),
        //   ),
        // );

        // console.log(`Transfer successful to ${contributions.length} grants!`);
        // await db.contribution.updateMany({
        //   where: { transferGroup: transfer_group },
        //   data: { status: "success" },
        // });
      }

      // if (event.type === "checkout.session.completed") {
      //   const { metadata } = event.data.object;
      //   console.log({ metadata });
      // }
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
