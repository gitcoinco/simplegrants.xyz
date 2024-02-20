/* eslint-disable @typescript-eslint/unbound-method */

import type Stripe from "stripe";
import { describe, expect, test } from "vitest";
import { stripe } from "~/server/__mocks__/stripe";

import { createMockCaller, mockSession, mockUserCreated } from "~/test-setup";

describe.skip("Stripe", async () => {
  const caller = await createMockCaller({ user: mockSession });
  test("get account", async () => {
    await caller.stripe.getAccount();

    expect(stripe.accounts.retrieve).toHaveBeenCalledWith(
      mockUserCreated.stripeAccount,
    );
  });

  test("verify account", async () => {
    const code = "ac_code";
    stripe.oauth.token.mockResolvedValue({
      stripe_user_id: mockUserCreated.stripeAccount,
    } as unknown as Stripe.OAuthToken);

    await caller.stripe.verifyAccount({ code });

    expect(stripe.oauth.token).toHaveBeenCalledWith({
      code,
      grant_type: "authorization_code",
    });
  });

  test("disconnect account", async () => {
    await caller.stripe.disconnectAccount();
    expect(stripe.oauth.deauthorize).toHaveBeenCalled();
  });
});
