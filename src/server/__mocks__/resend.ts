import { type Resend } from "resend";
import { beforeEach } from "vitest";
import { mockReset, mockDeep } from "vitest-mock-extended";

beforeEach(() => {
  mockReset(resend);
});

const resend = mockDeep<typeof Resend>();

export { resend };
