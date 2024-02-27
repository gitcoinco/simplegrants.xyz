import { z } from "zod";
import { ZStripeAccount } from "../stripe/stripe.schemas";

export const distributionTypes = [
  {
    value: "quadratic_funding",
    label: "Quadratic Funding",
  },
] as const;

export const distributionTypeLabels = distributionTypes.reduce(
  (acc, x) => ({ ...acc, [x.value]: x.label }),
  {} as Record<string, string>,
);
export const ZDistributionTypeSchema = z.enum(
  distributionTypes.map((type) => type.value) as [string, ...string[]],
);

const Round = z.object({
  name: z.string().min(3),
  description: z.string(),
  image: z.string().url(),
  stripeAccount: ZStripeAccount.nullish(),
  startsAt: z.coerce.date(),
  endsAt: z.coerce.date().refine((date) => date > new Date(), {
    message: "End date must be after today",
  }),
  distributionType: ZDistributionTypeSchema,
});

export const ZRoundCreateInputSchema = Round.refine(
  (schema) => schema.endsAt > schema.startsAt,
  {
    path: ["endsAt"],
    message: "End date must be after start date",
  },
);

export const ZRoundUpdateInputSchema = Round.partial();

export const ZRoundFundInputSchema = z.object({
  id: z.string(),
  amount: z.number(),
  currency: z.string().length(3),
  successUrl: z.string(),
});

export enum SortBy {
  name = "name",
  funded = "funded",
  createdAt = "createdAt",
}
export enum SortOrder {
  asc = "asc",
  desc = "desc",
}

export const ZFilterSchema = z.object({
  search: z.string(),
  sortBy: z.nativeEnum(SortBy),
  order: z.nativeEnum(SortOrder),
});

export type TRoundCreateInputSchema = z.infer<typeof ZRoundCreateInputSchema>;
export type TRoundUpdateInputSchema = z.infer<typeof ZRoundUpdateInputSchema>;
