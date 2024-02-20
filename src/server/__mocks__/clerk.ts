import type { clerkClient } from "@clerk/nextjs";
import { beforeEach } from "vitest";
import { mockReset, mockDeep } from "vitest-mock-extended";

beforeEach(() => {
  mockReset(clerk);
});

const clerk = mockDeep<typeof clerkClient>();

export { clerk };
