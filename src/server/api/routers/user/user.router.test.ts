/* eslint-disable @typescript-eslint/unbound-method */

import { type inferProcedureInput } from "@trpc/server";
import { describe, expect, test } from "vitest";
import { db } from "~/server/__mocks__/db";
import { StripeCheckoutResponse, stripe } from "~/server/__mocks__/stripe";

import { type AppRouter } from "~/server/api/root";
import { createMockCaller, mockSession, mockUserCreated } from "~/test-setup";

describe("User", async () => {
  describe("Get User", async () => {
    const caller = await createMockCaller({ session: mockSession });

    test("retrieves a user", async () => {
      await caller.user.get();

      expect(db.user.findFirst).toHaveBeenCalledWith({
        where: { id: mockUserCreated.id },
      });
    });
  });
});
