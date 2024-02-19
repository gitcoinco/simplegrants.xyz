/* eslint-disable @typescript-eslint/unbound-method */

import type Stripe from "stripe";
import { describe, expect, test } from "vitest";
import { db } from "~/server/__mocks__/db";
import { stripe } from "~/server/__mocks__/stripe";

import { createMockCaller, mockSession, mockUserCreated } from "~/test-setup";

describe("Stripe", async () => {
  const caller = await createMockCaller({ session: mockSession });
  test("get account", async () => {
    db.user.findFirst.mockResolvedValue(mockUserCreated);

    await caller.stripe.getAccount();

    expect(db.user.findFirst).toHaveBeenCalledWith({
      where: { id: mockUserCreated.id },
    });
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

    expect(db.user.update).toHaveBeenCalledWith({
      where: { id: mockUserCreated.id },
      data: { stripeAccount: mockUserCreated.stripeAccount },
    });
  });

  test("disconnect account", async () => {
    db.user.findFirst.mockResolvedValue(mockUserCreated);

    await caller.stripe.disconnectAccount();

    expect(db.user.findFirst).toHaveBeenCalledWith({
      where: { id: mockUserCreated.id },
    });
    expect(stripe.oauth.deauthorize).toHaveBeenCalled();
  });
});
