/* eslint-disable @typescript-eslint/unbound-method */

import { describe, test } from "vitest";
import { createMockCaller, mockSession } from "~/test-setup";

describe.skip("User", async () => {
  describe("Get User", async () => {
    const caller = await createMockCaller({ user: mockSession });

    test("retrieves a user", async () => {
      await caller.user.get();

      // expect(db.user.findFirst).toHaveBeenCalledWith({
      //   where: { id: mockUserCreated.id },
      // });
    });
  });
});
