import { adminProcedure, createTRPCRouter } from "../../trpc";
import { ZApproveSchema } from "./admin.schemas";

export const adminRouter = createTRPCRouter({
  grants: adminProcedure.query(({ ctx }) => {
    return ctx.db.grant.findMany({
      where: { isApproved: false },
      orderBy: { createdAt: "desc" },
    });
  }),
  approveGrants: adminProcedure
    .input(ZApproveSchema)
    .mutation(({ input: { ids }, ctx }) =>
      ctx.db.grant.updateMany({
        where: { id: { in: ids } },
        data: { isApproved: true },
      }),
    ),
  deleteGrants: adminProcedure
    .input(ZApproveSchema)
    .mutation(({ input: { ids }, ctx }) =>
      ctx.db.grant.deleteMany({ where: { id: { in: ids } } }),
    ),
  rounds: adminProcedure.query(({ ctx }) =>
    ctx.db.round.findMany({
      where: { isApproved: false },
      orderBy: { createdAt: "desc" },
    }),
  ),
  approveRounds: adminProcedure
    .input(ZApproveSchema)
    .mutation(({ input: { ids }, ctx }) =>
      ctx.db.round.updateMany({
        where: { id: { in: ids } },
        data: { isApproved: true },
      }),
    ),
  deleteRounds: adminProcedure
    .input(ZApproveSchema)
    .mutation(({ input: { ids }, ctx }) =>
      ctx.db.round.deleteMany({ where: { id: { in: ids } } }),
    ),
});
