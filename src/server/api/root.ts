import { grantRouter } from "~/server/api/routers/grant";
import { roundRouter } from "~/server/api/routers/round";
import { createTRPCRouter, t } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  grant: grantRouter,
  round: roundRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export const createCaller = t.createCallerFactory(appRouter);
