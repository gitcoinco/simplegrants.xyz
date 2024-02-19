import type { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import {
  ZFundInputSchema,
  ZRoundCreateInputSchema,
  ZRoundUpdateInputSchema,
} from "./round.schemas";
import {
  TransferType,
  createCheckout,
  createTransferGroup,
} from "~/server/stripe";

export async function getRound(id: string, db: PrismaClient) {
  return db.round.findFirst({ where: { id } });
}

export const roundRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => getRound(input.id, ctx.db)),

  list: publicProcedure.query(({ ctx }) =>
    ctx.db.round.findMany({
      include: {
        createdBy: true,
      },
    }),
  ),

  create: protectedProcedure
    .input(ZRoundCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.round.create({
        data: {
          ...input,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  update: protectedProcedure
    .input(z.object({ id: z.string(), data: ZRoundUpdateInputSchema }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const round = await getRound(input.id, ctx.db);

      if (userId !== round?.createdById) {
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
    .input(ZFundInputSchema)
    .mutation(async ({ ctx, input }) => {
      const round = await getRound(input.id, ctx.db);
      if (!round) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Round not found" });
      }

      return createCheckout(
        {
          successUrl: input.successUrl,
          metadata: {
            userId: ctx.session.user.id,
            type: TransferType.round,
          },
          transferGroup: createTransferGroup(input.id),
          lineItems: [
            {
              quantity: 1,
              price_data: {
                currency: "usd",
                product_data: {
                  name: String(round.name),
                  description: String(round.description),
                },
                unit_amount: input.amount,
              },
            },
          ],
        },
        ctx.stripe,
      );
    }),
});
