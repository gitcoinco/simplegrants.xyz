/* eslint-disable @typescript-eslint/unbound-method */

import { type inferProcedureInput } from "@trpc/server";
import { describe, expect, test } from "vitest";

import { type AppRouter } from "~/server/api/root";
import { db } from "~/server/__mocks__/db";
import {
  createMockCaller,
  mockApplicationCreated,
  mockGrantCreated,
  mockRoundCreated,
  mockSession,
} from "~/test-setup";

describe("Application", async () => {
  describe("Create Application", () => {
    type Input = inferProcedureInput<AppRouter["application"]["create"]>;
    const input: Input = {
      grantId: mockGrantCreated.id,
      roundId: mockRoundCreated.id,
    };
    test("must be a logged in user", async () => {
      const caller = await createMockCaller({ user: null });
      await expect(caller.application.create(input)).rejects.toThrow(
        "UNAUTHORIZED",
      );
    });
    test("must be owner of application", async () => {
      db.grant.findFirst.mockResolvedValue(mockGrantCreated);

      const caller = await createMockCaller({
        user: {
          ...mockSession,
          id: "another-user",
        },
      });
      await expect(caller.application.create(input)).rejects.toThrow(
        "UNAUTHORIZED",
      );
    });
    test("creates a application", async () => {
      db.grant.findFirst.mockResolvedValue(mockGrantCreated);
      const caller = await createMockCaller({ user: mockSession });
      await caller.application.create(input);

      expect(db.application.create).toHaveBeenCalled();
    });
  });

  describe("Get Application", async () => {
    const caller = await createMockCaller({ user: mockSession });

    test("list rounds", async () => {
      db.round.findFirst.mockResolvedValue(mockRoundCreated);
      await caller.application.list({
        roundId: mockRoundCreated.id,
      });

      expect(db.application.findMany).toHaveBeenCalled();
    });
  });

  describe("Approve Application", async () => {
    type Input = inferProcedureInput<AppRouter["application"]["approve"]>;
    const input: Input = {
      applicationIds: [mockApplicationCreated.id],
      roundId: mockRoundCreated.id,
    };

    test("must be a logged in user", async () => {
      const caller = await createMockCaller({ user: null });
      await expect(caller.application.approve(input)).rejects.toThrow(
        "UNAUTHORIZED",
      );
    });
    test("must be owner of application", async () => {
      db.grant.findFirst.mockResolvedValue(mockGrantCreated);

      const caller = await createMockCaller({
        user: {
          ...mockSession,
          id: "another-user",
        },
      });
      await expect(caller.application.approve(input)).rejects.toThrow(
        "UNAUTHORIZED",
      );
    });
    test("approves a application", async () => {
      db.round.findFirst.mockResolvedValue(mockRoundCreated);
      const caller = await createMockCaller({ user: mockSession });
      await caller.application.approve(input);

      expect(db.application.updateMany).toHaveBeenCalledWith({
        where: {
          roundId: mockRoundCreated.id,
          id: { in: input.applicationIds },
        },
        data: { approvedById: mockSession.id },
      });
    });
  });
});
