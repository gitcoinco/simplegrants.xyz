import type { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import type Stripe from "stripe";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import {
  ZDonateInputSchema,
  ZGrantCreateInputSchema,
  ZGrantUpdateInputSchema,
} from "./grant.schemas";
import {
  TransferType,
  createCheckout,
  createTransferGroup,
  getCustomerFee,
} from "~/server/stripe";

export async function getGrant(id: string, db: PrismaClient) {
  return db.grant.findFirst({ where: { id } });
}

export const grantRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => getGrant(input.id, ctx.db)),

  list: publicProcedure
    // .input(z.object({ roundId: z.string() }))
    .query(({ ctx, input }) =>
      ctx.db.grant.findMany({
        // where: { roundId: input.roundId },
        // include: { grant: true },
      }),
    ),

  approved: publicProcedure
    .input(z.object({ roundId: z.string() }))
    .query(async ({ ctx, input: { roundId } }) => {
      return ctx.db.application.findMany({
        where: { roundId, approvedById: { not: null } },
        include: { grant: true },
      });
    }),

  create: protectedProcedure
    .input(ZGrantCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      const { ...data } = input;
      return ctx.db.grant.create({
        data: {
          ...data,
          userId: ctx.user.id,
        },
      });
    }),

  update: protectedProcedure
    .input(z.object({ id: z.string(), data: ZGrantUpdateInputSchema }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      const grant = await getGrant(input.id, ctx.db);

      if (userId !== grant?.userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User must be owner of grant to update",
        });
      }

      return ctx.db.grant.update({
        where: { id: input.id },
        data: input.data,
      });
    }),

  donate: protectedProcedure
    .input(ZDonateInputSchema)
    .mutation(async ({ ctx, input }) => {
      const grantIds = input.grants.map((grant) => grant.id);
      const grants = await ctx.db.grant.findMany({
        where: { id: { in: grantIds } },
        select: { id: true, name: true, description: true },
      });

      const transferGroup = createTransferGroup();

      await ctx.db.contribution.createMany({
        data: input.grants.map(({ id, amount }) => ({
          transferGroup,
          amount,
          grantId: id,
          userId: ctx.user.id,
        })),
      });

      const currency = "usd";
      let totalDonation = 0;
      const lineItems = grants.map((grant) => {
        const amount = input.grants.find((g) => g.id === grant.id)?.amount;
        if (!amount) {
          throw new Error("Grant amount not found");
        }

        totalDonation += amount;
        return {
          quantity: 1,
          price_data: {
            currency,
            product_data: {
              name: grant.name,
              description: grant.description ?? "",
            },
            unit_amount: amount * 100,
          },
        };
      });

      if (true) {
        lineItems.push({
          price_data: {
            currency,
            product_data: {
              name: "Stripe Fees",
              description: "Processing fees taken by Stripe",
            },
            unit_amount: Math.round(getCustomerFee(totalDonation) * 100),
          },
          quantity: 1,
        });
      }

      return createCheckout(
        {
          successUrl: input.successUrl,
          metadata: {
            userId: ctx.user.id,
            type: TransferType.grant,
          },
          transferGroup,
          lineItems,
        },
        ctx.stripe,
      );
    }),
});
