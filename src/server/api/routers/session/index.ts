import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const sessionRouter = createTRPCRouter({
  applications: protectedProcedure.query(({ ctx }) =>
    ctx.db.application.findMany({
      where: { userId: ctx?.user.id },
    }),
  ),
  grants: protectedProcedure.query(({ ctx }) =>
    ctx.db.grant.findMany({
      where: { userId: ctx?.user.id },
    }),
  ),
});
