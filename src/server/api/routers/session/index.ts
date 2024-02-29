import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const sessionRouter = createTRPCRouter({
  applications: protectedProcedure
    .input(z.object({ roundId: z.string() }))
    .query(({ ctx, input: { roundId } }) =>
      ctx.db.application.findMany({
        where: { userId: ctx?.user.id, roundId },
      }),
    ),
  grants: protectedProcedure.query(({ ctx }) =>
    ctx.db.grant.findMany({
      where: { userId: ctx?.user.id },
    }),
  ),
});
