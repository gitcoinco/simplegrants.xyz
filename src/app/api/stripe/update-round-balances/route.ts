import { NextResponse, type NextRequest } from "next/server";
import { stripe } from "~/server/stripe";
import { db } from "~/server/db";

// Cron to make sure round balance in in sync with Stripe
async function handler(req: NextRequest) {
  try {
    const now = new Date();

    const rounds = await db.round.findMany({
      where: {
        startsAt: { gte: now },
        endsAt: { lte: now },
        stripeAccount: { not: undefined },
      },
    });
    console.log(
      `Updating round balances from Stripe for: ${rounds.length} rounds.`,
    );

    await Promise.all(
      rounds.map(async (round) => {
        if (!round.stripeAccount) return null;
        return stripe.charges
          .list(
            { limit: 100, transfer_group: round.id },
            { stripeAccount: round.stripeAccount },
          )
          .then(async (r) => {
            const amount = r.data.reduce((sum, x) => sum + x.amount, 0);
            console.log("Updating round with new amount");
            return db.round.update({
              where: { id: round.id },
              data: { fundedAmount: amount },
            });
          });
      }),
    );

    return NextResponse.json({ result: {}, ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong", ok: false },
      { status: 500 },
    );
  }
}
export { handler as GET, handler as POST };
