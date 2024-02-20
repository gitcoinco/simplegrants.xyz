/* eslint-disable @typescript-eslint/unbound-method */

import { type inferProcedureInput } from "@trpc/server";
import { describe, expect, test } from "vitest";
import { db } from "~/server/__mocks__/db";
import { StripeCheckoutResponse, stripe } from "~/server/__mocks__/stripe";

import { type AppRouter } from "~/server/api/root";
import {
  createMockCaller,
  mockGrantCreated,
  mockRoundCreated,
  mockSession,
  mockUserCreated,
} from "~/test-setup";

describe("Grant", async () => {
  describe("Create Grant", () => {
    type Input = inferProcedureInput<AppRouter["grant"]["create"]>;
    const input: Input = {
      name: "test",
      description: "test",
      image: "https://image-url",
    };
    test("must be a logged in user", async () => {
      const caller = await createMockCaller({ user: null });
      await expect(caller.grant.create(input)).rejects.toThrow("UNAUTHORIZED");
    });
    test("creates a grant", async () => {
      const caller = await createMockCaller({ user: mockSession });
      await caller.grant.create(input);

      expect(db.grant.create).toHaveBeenCalled();
    });
  });

  describe("Get Grant", async () => {
    const caller = await createMockCaller({ user: mockSession });

    test("retrieves a grant", async () => {
      type Input = inferProcedureInput<AppRouter["grant"]["get"]>;
      const input: Input = {
        id: mockGrantCreated.id,
      };

      await caller.grant.get(input);

      expect(db.grant.findFirst).toHaveBeenCalledWith({
        where: { id: mockGrantCreated.id },
      });
    });

    // test("list grants for round", async () => {
    //   type Input = inferProcedureInput<AppRouter["grant"]["list"]>;
    //   const input: Input = {
    //     roundId: mockRoundCreated.id,
    //   };

    //   await caller.grant.list(input);

    //   expect(db.grant.findMany).toHaveBeenCalledWith({
    //     where: { roundId: mockRoundCreated.id },
    //   });
    // });
  });

  describe("Update Grant", async () => {
    type Input = inferProcedureInput<AppRouter["grant"]["update"]>;
    const input: Input = {
      id: mockGrantCreated.id,
      data: {
        name: "test updated",
      },
    };
    test("must be a logged in user", async () => {
      const caller = await createMockCaller({ user: null });
      await expect(caller.grant.update(input)).rejects.toThrow("UNAUTHORIZED");
    });
    test("update grant", async () => {
      const caller = await createMockCaller({ user: mockSession });

      db.grant.findFirst.mockResolvedValue(mockGrantCreated);
      await caller.grant.update(input);

      expect(db.grant.update).toHaveBeenCalled();
    });
    test("must be owner of grant", async () => {
      const caller = await createMockCaller({ user: mockSession });

      db.grant.findFirst.mockResolvedValue({
        ...mockGrantCreated,
        userId: "another-user",
      });

      await expect(caller.grant.update(input)).rejects.toThrow(
        "User must be owner of grant",
      );
    });
  });

  describe("Donate to Grant", async () => {
    type Input = inferProcedureInput<AppRouter["grant"]["donate"]>;

    const input: Input = {
      grants: Array.from({ length: 192 })
        .fill(0)
        .map((_, i) => ({ id: `test-${i}`, amount: (i + 1) * 100 })),
      successUrl: "https://success",
    };
    test("must be a logged in user", async () => {
      const caller = await createMockCaller({ user: null });
      await expect(caller.grant.donate(input)).rejects.toThrow("UNAUTHORIZED");
    });
    test("donate to grant", async () => {
      const caller = await createMockCaller({ user: mockSession });

      stripe.checkout.sessions.create.mockResolvedValue(StripeCheckoutResponse);

      db.grant.findMany.mockResolvedValue(
        input.grants.map((g) => ({ ...mockGrantCreated, id: g.id })),
      );

      const checkout = await caller.grant.donate(input);
      expect(db.contribution.createMany).toHaveBeenCalled();
      expect(stripe.checkout.sessions.create).toHaveBeenCalled();
      expect(checkout.url).toBeDefined();
    });
    test.skip("grant owner must have a stripe account", async () => {
      const caller = await createMockCaller({ user: mockSession });

      stripe.checkout.sessions.create.mockResolvedValue(StripeCheckoutResponse);

      db.grant.findFirst.mockResolvedValue(mockGrantCreated);
      db.round.findFirst.mockResolvedValue(mockRoundCreated);

      await expect(caller.grant.donate(input)).rejects.toThrow(
        "Stripe account not set for user. Connect Stripe first.",
      );
    });
  });
});
