import { applicationRouter } from "~/server/api/routers/application";
import { grantRouter } from "~/server/api/routers/grant";
import { roundRouter } from "~/server/api/routers/round";
import { stripeRouter } from "~/server/api/routers/stripe";
import { sessionRouter } from "~/server/api/routers/session";
import { userRouter } from "~/server/api/routers/user";

import { createTRPCRouter, t } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  application: applicationRouter,
  grant: grantRouter,
  round: roundRouter,
  stripe: stripeRouter,
  session: sessionRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export const createCaller = t.createCallerFactory(appRouter);
