import { z } from "zod";

export const ZApproveSchema = z.object({
  ids: z.array(z.string()),
});

export type TApproveSchema = z.infer<typeof ZApproveSchema>;
