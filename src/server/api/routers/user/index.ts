import { type PrismaClient } from "@prisma/client";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export async function getUser(id: string, db: PrismaClient) {
  return db.user.findFirst({ where: { id } });
}

export const userRouter = createTRPCRouter({
  get: protectedProcedure.query(({ ctx }) => {
    return getUser(ctx.session.user.id, ctx.db);
  }),
});
