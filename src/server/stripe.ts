import { nanoid } from "nanoid";
import { Stripe } from "stripe";
import { getBaseUrl, getUrl } from "~/trpc/shared";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type Checkout = {
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[];
  successUrl: string;
  metadata: Stripe.Checkout.SessionCreateParams.PaymentIntentData["metadata"];
  transferGroup: string;
  stripeAccount?: string;
};
export async function createCheckout(
  { successUrl, transferGroup, metadata, lineItems, stripeAccount }: Checkout,
  stripe: Stripe,
) {
  return stripe.checkout.sessions.create(
    {
      mode: "payment",
      success_url: `${getBaseUrl()}/${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      payment_method_types: ["card"],
      payment_intent_data: {
        // With this group we can query round balance and handle payouts
        transfer_group: transferGroup,
        metadata: metadata,
      },
      line_items: lineItems,
    },
    { stripeAccount },
  );
}

export enum TransferType {
  round = "round",
  grant = "grant",
  payout = "payout",
}
export function createTransferGroup(id = nanoid()) {
  return id;
}

export function getCustomerFee(amount: number): number {
  const fixedFee = 0.3;
  const percentFee = 0.029;

  return roundNumber((amount + fixedFee) / (1 - percentFee) - amount);
}
function roundNumber(num: number) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}
