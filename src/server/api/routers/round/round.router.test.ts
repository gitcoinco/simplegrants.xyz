/* eslint-disable @typescript-eslint/unbound-method */

import { type inferProcedureInput } from "@trpc/server";
import { describe, expect, test } from "vitest";

import { type AppRouter } from "~/server/api/root";
import { db } from "~/server/__mocks__/db";
import { StripeCheckoutResponse, stripe } from "~/server/__mocks__/stripe";
import { createMockCaller, mockRoundCreated, mockSession } from "~/test-setup";
import { SortBy, SortOrder } from "./round.schemas";

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
      stripeAccount: mockRoundCreated.stripeAccount,
    };
    test("must be a logged in user", async () => {
      const caller = await createMockCaller({ user: null });
      await expect(caller.round.create(input)).rejects.toThrow("UNAUTHORIZED");
    });
    test("creates a round", async () => {
      const caller = await createMockCaller({ user: mockSession });
      await caller.round.create(input);

      expect(db.round.create).toHaveBeenCalled();
    });
  });

  describe("Get Round", async () => {
    const caller = await createMockCaller({ user: mockSession });

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
      await caller.round.list({
        search: "",
        sortBy: SortBy.name,
        order: SortOrder.asc,
      });

      expect(db.round.findMany).toHaveBeenCalled();
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
      const caller = await createMockCaller({ user: null });
      await expect(caller.round.update(input)).rejects.toThrow("UNAUTHORIZED");
    });
    test("update round", async () => {
      const caller = await createMockCaller({ user: mockSession });

      db.round.findFirst.mockResolvedValue(mockRoundCreated);
      await caller.round.update(input);

      expect(db.round.update).toHaveBeenCalled();
    });
    test("must be owner of round", async () => {
      const caller = await createMockCaller({ user: mockSession });

      db.round.findFirst.mockResolvedValue({
        ...mockRoundCreated,
        userId: "another-user",
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
      successUrl: "success",
    };
    test("must be a logged in user", async () => {
      const caller = await createMockCaller({ user: null });
      await expect(caller.round.fund(input)).rejects.toThrow("UNAUTHORIZED");
    });
    test("round must have a stripe account", async () => {
      const caller = await createMockCaller({ user: mockSession });

      stripe.checkout.sessions.create.mockResolvedValue(StripeCheckoutResponse);
      db.round.findFirst.mockResolvedValue({
        ...mockRoundCreated,
        stripeAccount: null,
      });

      await expect(caller.round.fund(input)).rejects.toThrow(
        "Round must have a connected Stripe account",
      );
    });
    test("fund round", async () => {
      const caller = await createMockCaller({ user: mockSession });

      stripe.checkout.sessions.create.mockResolvedValue(StripeCheckoutResponse);
      db.round.findFirst.mockResolvedValue(mockRoundCreated);

      const checkout = await caller.round.fund(input);

      expect(stripe.checkout.sessions.create).toHaveBeenCalled();
      expect(checkout.url).toBeDefined();
    });
  });
});
