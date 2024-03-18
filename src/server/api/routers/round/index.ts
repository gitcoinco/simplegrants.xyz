import type { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import {
  ZRoundCreateInputSchema,
  ZRoundUpdateInputSchema,
  ZRoundFundInputSchema,
  ZFilterSchema,
} from "./round.schemas";
import {
  TransferType,
  createCheckout,
  createTransferGroup,
} from "~/server/stripe";
import { verifyRoundOwnership } from "../application";

export async function getRound(id: string, db: PrismaClient) {
  return db.round.findFirst({ where: { id } });
}

export const roundRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => getRound(input.id, ctx.db)),

  list: publicProcedure
    .input(ZFilterSchema)
    .query(({ input: { sortBy, search, order }, ctx }) => {
      return ctx.db.round.findMany({
        where: {
          name: { contains: search, mode: "insensitive" },
          isApproved: true,
        },
        orderBy: { [sortBy]: order },
        include: {
          applications: {
            where: {
              approvedById: { not: null },
            },
          },
        },
      });
    }),
  balance: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      // TODO: Not used anymore?
      return getRound(input.id, ctx.db);
    }),

  create: protectedProcedure
    .input(ZRoundCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.round.create({ data: { ...input, userId: ctx.user.id } });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await verifyRoundOwnership(input.id, ctx);
      return ctx.db.round.delete({ where: { id: input.id } });
    }),

  update: protectedProcedure
    .input(z.object({ id: z.string(), data: ZRoundUpdateInputSchema }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      const round = await getRound(input.id, ctx.db);

      if (userId !== round?.userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User must be owner of round to update",
        });
      }

      return ctx.db.round.update({
        where: { id: input.id },
        data: input.data,
      });
    }),

  fund: protectedProcedure
    .input(ZRoundFundInputSchema)
    .mutation(async ({ ctx, input }) => {
      const round = await getRound(input.id, ctx.db);
      if (!round) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Round not found" });
      }
      if (!round.stripeAccount || !round.currency) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Round must have a connected Stripe account and a configured currency",
        });
      }

      return createCheckout(
        {
          successUrl: input.successUrl,
          metadata: {
            userId: ctx.user.id,
            type: TransferType.round,
          },
          email: ctx.user.emailAddresses?.[0]?.emailAddress,
          transferGroup: createTransferGroup(input.id),
          stripeAccount: round.stripeAccount,
          lineItems: [
            {
              quantity: 1,
              price_data: {
                currency: round.currency,
                product_data: {
                  name: String(round.name),
                  description: String(round.description),
                },
                unit_amount: input.amount * 100,
              },
            },
          ],
        },
        ctx.stripe,
      );
    }),
});
