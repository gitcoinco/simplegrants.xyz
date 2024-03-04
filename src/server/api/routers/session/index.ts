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
      orderBy: { name: "asc" },
    }),
  ),
  funded: protectedProcedure.query(({ ctx }) =>
    ctx.db.contribution
      .groupBy({
        by: ["userId"],
        where: { userId: ctx?.user.id, status: "success" },
        _sum: {
          amount: true,
        },
      })
      .then((r) => {
        const amount = r.reduce((sum, x) => sum + (x._sum.amount ?? 0), 0);
        return { amount };
      }),
  ),
  funding: protectedProcedure.query(({ ctx }) =>
    ctx.db.contribution
      .groupBy({
        by: ["userId"],
        where: { grant: { userId: ctx?.user.id }, status: "success" },
        _sum: {
          amount: true,
        },
      })
      .then((r) => {
        const amount = r.reduce((sum, x) => sum + (x._sum.amount ?? 0), 0);
        return { amount };
      }),
  ),
  contributions: protectedProcedure.query(({ ctx }) =>
    ctx.db.contribution.findMany({
      where: { userId: ctx?.user.id, status: "success" },
      orderBy: { updatedAt: "desc" },
      include: {
        grant: true,
      },
    }),
  ),
});
