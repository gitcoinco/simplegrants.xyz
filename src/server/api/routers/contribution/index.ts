import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { calculateQuadraticMatching } from "~/utils/calculateQuadraticMatching";

export type MatchingAmounts = Record<string, number>;
export const contributionRouter = createTRPCRouter({
  get: protectedProcedure
    .input(
      z.object({
        checkoutGrants: z
          .array(z.object({ id: z.string(), amount: z.number() }))
          .default([]),
      }),
    )
    .query(async ({ ctx, input: { checkoutGrants } }) => {
      const now = new Date();

      const rounds = await ctx.db.round
        .findMany({
          select: {
            id: true,
            fundedAmount: true,
            currency: true,
            applications: {
              select: {
                grant: { select: { id: true } },
              },
            },
          },
          where: {
            applications: { some: { approvedById: { not: undefined } } },
            startsAt: { lte: now },
            endsAt: { gte: now },
          },
        })
        .then((rounds) =>
          rounds.map((round) => ({
            id: round.id,
            fundedAmount: round.fundedAmount,
            grant: round.applications.map((appl) => appl.grant.id),
          })),
        );

      const contributions = await ctx.db.contribution.findMany({
        select: { amount: true, grantId: true, userId: true },
        where: {
          grantId: { in: rounds.flatMap((r) => r.grant) },
          status: "success",
          createdAt: { lte: now },
        },
      });

      const totalMatchingAmount = rounds.reduce(
        (sum, x) => sum + x.fundedAmount,
        0,
      );

      const matching = calculateQuadraticMatching(
        contributions,
        totalMatchingAmount,
      );
      const matchingCheckout = calculateQuadraticMatching(
        [
          ...contributions,
          ...checkoutGrants.map((g) => ({
            userId: ctx.user.id,
            grantId: g.id,
            amount: (g.amount ?? 0) * 100,
          })),
        ],
        totalMatchingAmount,
      );
      return { matching, matchingCheckout };
    }),
});
