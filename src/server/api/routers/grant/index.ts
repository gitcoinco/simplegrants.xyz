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
import { getRound } from "../round";
import { getUser } from "../user";
import {
  TransferType,
  createCheckout,
  createTransferGroup,
} from "~/server/stripe";

async function getGrant(id: string, db: PrismaClient) {
  return db.grant.findFirst({ where: { id } });
}

export const grantRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => getGrant(input.id, ctx.db)),

  list: publicProcedure
    .input(z.object({ roundId: z.string() }))
    .query(({ ctx, input }) =>
      ctx.db.grant.findMany({
        where: { roundId: input.roundId },
      }),
    ),

  create: protectedProcedure
    .input(ZGrantCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      const { roundId, ...data } = input;
      return ctx.db.grant.create({
        data: {
          ...data,
          round: { connect: { id: roundId } },
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  update: protectedProcedure
    .input(ZGrantUpdateInputSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const grant = await getGrant(input.id, ctx.db);

      if (userId !== grant?.createdById) {
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
        where: {
          id: { in: grantIds },
        },
      });

      return createCheckout(
        {
          successUrl: input.successUrl,
          metadata: {
            userId: ctx.session.user.id,
            type: TransferType.grant,
          },
          transferGroup: createTransferGroup(),
          lineItems: grants.map((grant) => {
            const amount = input.grants.find((g) => g.id === grant.id)?.amount;
            return {
              quantity: 1,
              price_data: {
                currency: "usd",
                product_data: {
                  name: String(grant.name),
                  description: String(grant.description),
                },
                unit_amount: amount,
              },
            };
          }),
        },
        ctx.stripe,
      );
    }),
});
