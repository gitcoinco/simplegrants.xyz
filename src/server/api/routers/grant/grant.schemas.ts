import { z } from "zod";

export const ZGrantCreateInputSchema = z.object({
  name: z.string(),
  description: z.string(),
  image: z.string().url(),
  roundId: z.string(),
});

export const ZGrantUpdateInputSchema = z.object({
  id: z.string(),
  data: ZGrantCreateInputSchema.partial(),
});

export const ZDonateInputSchema = z.object({
  grants: z.array(
    z.object({
      id: z.string(),
      amount: z.number(),
    }),
  ),
  successUrl: z.string().url(),
});
