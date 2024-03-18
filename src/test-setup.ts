/* eslint-disable @typescript-eslint/consistent-type-imports */

import { vi } from "vitest";

import { createCaller } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { db } from "~/server/__mocks__/db";
import { stripe } from "~/server/__mocks__/stripe";
import { User } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs";

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

vi.mock("~/server/__mocks__/clerk", async () => {
  const actual = await vi.importActual<
    typeof import("~/server/__mocks__/clerk")
  >("~/server/__mocks__/clerk");
  return { ...actual };
});

vi.mock("~/server/__mocks__/resend", async () => {
  const actual = await vi.importActual<
    typeof import("~/server/__mocks__/resend")
  >("~/server/__mocks__/resend");

  return { ...actual };
});

export const mockUserCreated = {
  id: "test-user",
  email: "test@example.com",
  name: "Test User",
  image: "",
  emailVerified: new Date(),
  stripeAccount: "acct_test-user",
  emailAddresses: [
    {
      emailAddress: "foo@bar.com",
    },
  ],
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
  fundedAmount: 0,
  currency: "usd",
  userId: mockUserCreated.id,
  distributionType: "quadratic-funding",
  stripeAccount: "acct_roundAccount",
};

export const mockGrantCreated = {
  id: "test-grant",
  name: "Test Grant",
  description: "",
  image: "https://image-url",
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: mockUserCreated.id,
  roundId: mockRoundCreated.id,
  distributionType: "quadratic-funding",
  stripeAccount: "acct_grantAccount",
};

export const mockApplicationCreated = {
  id: "test-application",
  name: "Test Application",
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: mockUserCreated.id,
  roundId: mockRoundCreated.id,
  grantId: mockGrantCreated.id,
};

export const mockSession = { id: mockUserCreated.id } as User;

export async function createMockCaller({ user }: { user: User | null }) {
  const ctx = await createInnerTRPCContext({
    user,
    db,
    stripe,
    clerk: clerkClient,
  });
  return createCaller(ctx);
}
