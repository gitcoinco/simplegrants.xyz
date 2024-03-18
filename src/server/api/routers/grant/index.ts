import type { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
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
} from "~/server/stripe";
import { verifyGrantOwnership } from "../application";
import { ZFilterSchema } from "../round/round.schemas";

export async function getGrant(id: string, db: PrismaClient) {
  return db.grant.findFirst({ where: { id } });
}

export const grantRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => getGrant(input.id, ctx.db)),

  list: publicProcedure
    .input(ZFilterSchema)
    .query(async ({ ctx, input: { sortBy, order, search } }) => {
      return ctx.db.grant.findMany({
        where: {
          name: { contains: search, mode: "insensitive" },
          isApproved: true,
        },
        orderBy: { [sortBy]: order },
      });
    }),

  funding: publicProcedure
    .input(z.object({ ids: z.array(z.string()) }).optional())
    .query(({ ctx, input }) =>
      ctx.db.contribution
        .aggregate({
          where: {
            grantId: input ? { in: input.ids } : undefined,
            status: "success",
          },
          _sum: { amount: true },
        })
        .then((r) => r._sum),
    ),

  funders: publicProcedure
    .input(z.object({ ids: z.array(z.string()) }).optional())
    .query(({ ctx, input }) =>
      ctx.db.contribution.groupBy({
        by: ["userId"],
        where: {
          grantId: input ? { in: input.ids } : undefined,
          status: "success",
        },
      }),
    ),

  rounds: publicProcedure
    .input(z.object({ ids: z.array(z.string()) }).optional())
    .query(({ ctx, input }) => {
      return ctx.db.application
        .findMany({
          where: {
            grantId: input ? { in: input.ids } : undefined,
            approvedById: { not: null },
          },
          select: {
            round: {
              select: { id: true, name: true, endsAt: true },
            },
          },
        })
        .then((r) => r.map((appl) => appl.round));
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await verifyGrantOwnership(input.id, ctx);
      return ctx.db.grant.delete({ where: { id: input.id } });
    }),
  approved: publicProcedure
    .input(z.object({ roundId: z.string() }))
    .query(async ({ ctx, input: { roundId } }) => {
      return ctx.db.application
        .findMany({
          where: { roundId, approvedById: { not: null } },
          include: { grant: true },
        })
        .then((applications) => applications.map((a) => a.grant));
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

      // TODO: Verify grant has an approved application?

      const transferGroup = createTransferGroup();

      await ctx.db.contribution.createMany({
        data: input.grants.map(({ id, amount }) => ({
          transferGroup,
          amount: amount * 100,
          grantId: id,
          userId: ctx.user.id,
        })),
      });

      const currency = "usd";
      const lineItems = grants.map((grant) => {
        const amount = input.grants.find((g) => g.id === grant.id)?.amount;
        if (!amount) {
          throw new Error("Grant amount not found");
        }

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

      return createCheckout(
        {
          email: ctx.user.emailAddresses?.[0]?.emailAddress,
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
