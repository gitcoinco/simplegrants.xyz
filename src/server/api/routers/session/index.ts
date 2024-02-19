import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const sessionRouter = createTRPCRouter({
  grants: protectedProcedure.query(({ ctx }) =>
    ctx.db.grant.findMany({
      where: { createdById: ctx.session?.user.id },
      // include: { grant: true },
    }),
  ),
});
