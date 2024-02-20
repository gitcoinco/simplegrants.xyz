import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { getUser } from "../user";

const STRIPE_CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!;

export const stripeRouter = createTRPCRouter({
  getAccount: protectedProcedure.query(async ({ ctx }) => {
    const user = await getUser(ctx.user.id, ctx.clerk);
    const stripeAccount = user.privateMetadata.stripeAccount as string;
    if (!stripeAccount) return null;

    return ctx.stripe.accounts.retrieve(stripeAccount);
  }),

  verifyAccount: protectedProcedure
    .input(z.object({ code: z.string().startsWith("ac_") }))
    .mutation(async ({ ctx, input: { code } }) => {
      const account = await ctx.stripe.oauth.token({
        grant_type: "authorization_code",
        code,
      });

      return ctx.clerk.users.updateUserMetadata(ctx.user.id, {
        privateMetadata: {
          stripeAccount: account.stripe_user_id,
        },
      });
    }),

  disconnectAccount: protectedProcedure.mutation(async ({ ctx }) => {
    const user = await getUser(ctx.user.id, ctx.clerk);
    const stripeAccount = user.privateMetadata.stripeAccount as string;
    if (!stripeAccount) return null;

    await ctx.stripe.oauth.deauthorize({
      client_id: STRIPE_CLIENT_ID,
      stripe_user_id: stripeAccount,
    });

    return ctx.clerk.users.updateUserMetadata(ctx.user.id, {
      privateMetadata: {
        stripeAccount: null,
      },
    });
  }),
});
