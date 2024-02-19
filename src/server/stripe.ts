import { nanoid } from "nanoid";
import { Stripe } from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createCheckout(
  params: {
    lineItems: Stripe.Checkout.SessionCreateParams.LineItem[];
    successUrl: string;
    metadata: Stripe.Checkout.SessionCreateParams.PaymentIntentData["metadata"];
    transferGroup: string;
    stripeAccount?: string;
  },
  stripe: Stripe,
) {
  return stripe.checkout.sessions.create({
    mode: "payment",
    success_url: params.successUrl,
    payment_method_types: ["card"],
    payment_intent_data: {
      // With this group we can query round balance and handle payouts
      transfer_group: params.transferGroup,
      metadata: params.metadata,
    },
    line_items: params.lineItems,
  });
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
