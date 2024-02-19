import { z } from "zod";
import { ZStripeAccount } from "../stripe/stripe.schemas";

export const ZGrantCreateInputSchema = z.object({
  name: z.string(),
  description: z.string(),
  stripeAccount: ZStripeAccount.nullish(),
  image: z.string().url(),
});

export const ZGrantUpdateInputSchema = ZGrantCreateInputSchema.partial();

export const ZDonateInputSchema = z.object({
  grants: z.array(
    z.object({
      id: z.string(),
      amount: z.number(),
    }),
  ),
  successUrl: z.string().url(),
});

export type TGrantCreateInputSchema = z.infer<typeof ZGrantCreateInputSchema>;
export type TGrantUpdateInputSchema = z.infer<typeof ZGrantUpdateInputSchema>;
export type TDonateInputSchema = z.infer<typeof ZDonateInputSchema>;
