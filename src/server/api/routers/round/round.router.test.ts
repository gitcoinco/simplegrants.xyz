/* eslint-disable @typescript-eslint/unbound-method */

import { type inferProcedureInput } from "@trpc/server";
import { describe, expect, test } from "vitest";

import { type AppRouter } from "~/server/api/root";
import { db } from "~/server/__mocks__/db";
import { StripeCheckoutResponse, stripe } from "~/server/__mocks__/stripe";
import {
  createMockCaller,
  mockRoundCreated,
  mockSession,
  mockUserCreated,
} from "~/test-setup";

describe("Round", async () => {
  describe("Create Round", () => {
    type Input = inferProcedureInput<AppRouter["round"]["create"]>;
    const input: Input = {
      name: "test",
      description: "test",
      image: "https://image-url",
      startsAt: new Date(Date.now() + 1000),
      endsAt: new Date(Date.now() + 2000),
      distributionType: "quadratic_funding",
    };
    test("must be a logged in user", async () => {
      const caller = await createMockCaller({ session: null });
      await expect(caller.round.create(input)).rejects.toThrow("UNAUTHORIZED");
    });
    test("creates a round", async () => {
      const caller = await createMockCaller({ session: mockSession });
      await caller.round.create(input);

      expect(db.round.create).toHaveBeenCalled();
    });
  });

  describe("Get Round", async () => {
    const caller = await createMockCaller({ session: mockSession });

    test("retrieves a round", async () => {
      type Input = inferProcedureInput<AppRouter["round"]["get"]>;
      const input: Input = {
        id: mockRoundCreated.id,
      };

      db.round.findFirst.mockResolvedValue(mockRoundCreated);
      await caller.round.get(input);

      expect(db.round.findFirst).toHaveBeenCalledWith({
        where: {
          id: mockRoundCreated.id,
        },
      });
    });

    test("list rounds", async () => {
      await caller.round.list();

      expect(db.round.findMany).toHaveBeenCalledWith({
        include: {
          createdBy: true,
        },
      });
    });
  });

  describe("Update Round", async () => {
    type Input = inferProcedureInput<AppRouter["round"]["update"]>;
    const input: Input = {
      id: mockRoundCreated.id,
      data: {
        name: "test updated",
      },
    };
    test("must be a logged in user", async () => {
      const caller = await createMockCaller({ session: null });
      await expect(caller.round.update(input)).rejects.toThrow("UNAUTHORIZED");
    });
    test("update round", async () => {
      const caller = await createMockCaller({ session: mockSession });

      db.round.findFirst.mockResolvedValue(mockRoundCreated);
      await caller.round.update(input);

      expect(db.round.update).toHaveBeenCalled();
    });
    test("must be owner of round", async () => {
      const caller = await createMockCaller({ session: mockSession });

      db.round.findFirst.mockResolvedValue({
        ...mockRoundCreated,
        createdById: "another-user",
      });

      await expect(caller.round.update(input)).rejects.toThrow(
        "User must be owner of round",
      );
    });
  });

  describe("Fund Round", () => {
    type Input = inferProcedureInput<AppRouter["round"]["fund"]>;
    const input: Input = {
      id: mockRoundCreated.id,
      amount: 100,
      successUrl: "https://success",
    };
    test("must be a logged in user", async () => {
      const caller = await createMockCaller({ session: null });
      await expect(caller.round.fund(input)).rejects.toThrow("UNAUTHORIZED");
    });
    test("fund round", async () => {
      const caller = await createMockCaller({ session: mockSession });

      stripe.checkout.sessions.create.mockResolvedValue(StripeCheckoutResponse);
      db.round.findFirst.mockResolvedValue(mockRoundCreated);
      db.user.findFirst.mockResolvedValue(mockUserCreated);

      const checkout = await caller.round.fund(input);

      expect(stripe.checkout.sessions.create).toHaveBeenCalled();
      expect(checkout.url).toBeDefined();
    });
    test.skip("round owner must have a stripe account", async () => {
      const caller = await createMockCaller({ session: mockSession });

      stripe.checkout.sessions.create.mockResolvedValue(StripeCheckoutResponse);
      db.round.findFirst.mockResolvedValue(mockRoundCreated);
      db.user.findFirst.mockResolvedValue({
        ...mockUserCreated,
        stripeAccount: null,
      });

      await expect(caller.round.fund(input)).rejects.toThrow(
        "Stripe account not set for user. Connect Stripe first.",
      );
    });
  });
});
