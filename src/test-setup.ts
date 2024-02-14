/* eslint-disable @typescript-eslint/consistent-type-imports */

import { vi } from "vitest";

import { createCaller } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { db } from "~/server/__mocks__/db";
import { stripe } from "~/server/__mocks__/stripe";
import { Session } from "next-auth";

vi.mock("~/server/__mocks__/db", async () => {
  const actual = await vi.importActual<typeof import("~/server/__mocks__/db")>(
    "~/server/__mocks__/db",
  );
  return { ...actual };
});

vi.mock("~/server/__mocks__/stripe", async () => {
  const actual = await vi.importActual<
    typeof import("~/server/__mocks__/stripe")
  >("~/server/__mocks__/stripe");
  return { ...actual };
});

export const mockUserCreated = {
  id: "test-user",
  email: "test@example.com",
  name: "Test User",
  image: "",
  emailVerified: new Date(),
  stripeAccount: "acct_test-user",
};

const ONE_DAY = 1000 * 60 * 60 * 24;
export const mockRoundCreated = {
  id: "test-round",
  name: "Test Round",
  description: "Round Description",
  image: "https://image-url",
  startsAt: new Date(Date.now() + ONE_DAY),
  endsAt: new Date(Date.now() + ONE_DAY),
  createdAt: new Date(),
  updatedAt: new Date(),
  createdById: "test-user",
  distributionType: "quadratic-funding",
};

export const mockGrantCreated = {
  id: "test-grant",
  name: "Test Grant",
  description: "",
  image: "https://image-url",
  createdAt: new Date(),
  updatedAt: new Date(),
  createdById: mockUserCreated.id,
  roundId: mockRoundCreated.id,
  distributionType: "quadratic-funding",
};

export const mockSession = {
  user: mockUserCreated,
  expires: String(Infinity),
} as Session;

export async function createMockCaller({
  session,
}: {
  session: Session | null;
}) {
  const ctx = await createInnerTRPCContext({
    session,
    db,
    stripe,
  });
  return createCaller(ctx);
}
