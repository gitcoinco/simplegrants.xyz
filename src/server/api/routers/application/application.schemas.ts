import { z } from "zod";

export const ZApplicationCreateSchema = z.object({
  grantId: z.string(),
  roundId: z.string(),
});

export const ZApplicationListSchema = z.object({
  roundId: z.string(),
});

export type TApplicationCreate = z.infer<typeof ZApplicationCreateSchema>;
