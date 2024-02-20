import { type clerkClient } from "@clerk/nextjs";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export async function getUser(id: string, clerk: typeof clerkClient) {
  return clerk.users.getUser(id);
}

export const userRouter = createTRPCRouter({
  get: protectedProcedure.query(({ ctx }) => {
    return getUser(ctx.user.id, ctx.clerk);
  }),
});
