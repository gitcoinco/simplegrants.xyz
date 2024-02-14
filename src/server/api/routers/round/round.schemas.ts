import { z } from "zod";

export const ZDistributionTypeSchema = z.enum(["quadratic-funding"]);

const Round = z.object({
  name: z.string().min(3),
  description: z.string(),
  image: z.string().url(),
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

export const ZRoundUpdateInputSchema = z.object({
  id: z.string(),
  data: Round.partial(),
});

export const ZFundInputSchema = z.object({
  id: z.string(),
  amount: z.number(),
  successUrl: z.string().url(),
});

export type TRoundCreateInputSchema = z.infer<typeof ZRoundCreateInputSchema>;
