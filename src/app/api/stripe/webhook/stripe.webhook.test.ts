import { describe, test } from "vitest";

describe("Stripe Webhook", async () => {
  test.todo("transfers successful checkout to grants", async () => {
    const event = {
      metadata: { type: "grant", userId: "clsncr3xx000010bbf8i4m4lo" },
      transfer_group: "LJMQ2Qo7Au2wbdbbSs5cl",
    };
  });
});
