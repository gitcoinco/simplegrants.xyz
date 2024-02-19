import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { getUser } from "../user";

const STRIPE_CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!;

export const stripeRouter = createTRPCRouter({
  getAccount: protectedProcedure.query(async ({ ctx }) => {
    const user = await getUser(ctx.session.user.id, ctx.db);
    if (!user?.stripeAccount) return null;
    return ctx.stripe.accounts.retrieve(user?.stripeAccount);
  }),

  verifyAccount: protectedProcedure
    .input(z.object({ code: z.string().startsWith("ac_") }))
    .mutation(async ({ ctx, input: { code } }) => {
      const account = await ctx.stripe.oauth.token({
        grant_type: "authorization_code",
        code,
      });

      return ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: { stripeAccount: account.stripe_user_id },
      });
    }),

  disconnectAccount: protectedProcedure.mutation(async ({ ctx }) => {
    const user = await getUser(ctx.session.user.id, ctx.db);
    if (!user?.stripeAccount) return null;
    await ctx.stripe.oauth.deauthorize({
      client_id: STRIPE_CLIENT_ID,
      stripe_user_id: user.stripeAccount,
    });

    return ctx.db.user.update({
      where: { id: user.id },
      data: { stripeAccount: null },
    });
  }),
});
