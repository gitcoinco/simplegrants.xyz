import { nanoid } from "nanoid";
import { Stripe } from "stripe";
import { getBaseUrl } from "~/trpc/shared";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type Checkout = {
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[];
  successUrl: string;
  metadata: Stripe.Checkout.SessionCreateParams.PaymentIntentData["metadata"];
  transferGroup: string;
  stripeAccount?: string;
  email?: string;
};
export async function createCheckout(
  {
    successUrl,
    transferGroup,
    metadata,
    lineItems,
    stripeAccount,
    email,
  }: Checkout,
  stripe: Stripe,
) {
  return stripe.checkout.sessions.create(
    {
      mode: "payment",
      success_url: `${getBaseUrl()}/${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      payment_method_types: ["card"],
      customer_email: email,
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
