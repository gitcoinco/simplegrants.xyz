import { describe, expect, test } from "vitest";
import {
  calculateMatchingForGrant,
  calculateQuadraticMatching,
  roundNumber,
} from "./calculateQuadraticMatching";

describe("Calculate quadratic matching funds", () => {
  const matchingAmount = 10_000;
  const contributions = [
    {
      amount: 100,
      grantId: "grantA",
      userId: "userA",
    },
    {
      amount: 50,
      grantId: "grantB",
      userId: "userA",
    },
    {
      amount: 20,
      grantId: "grantC",
      userId: "userA",
    },
    {
      amount: 200,
      grantId: "grantA",
      userId: "userB",
    },
    {
      amount: 30,
      grantId: "grantB",
      userId: "userB",
    },
    {
      amount: 300,
      grantId: "grantC",
      userId: "userC",
    },
    {
      amount: 10,
      grantId: "grantB",
      userId: "userD",
    },
    {
      amount: 500,
      grantId: "grantD",
      userId: "userD",
    },
    {
      amount: 15,
      grantId: "grantB",
      userId: "userE",
    },
  ];
  test("calculation", () => {
    const matching = calculateQuadraticMatching(contributions, matchingAmount);
    const summedAmount = roundNumber(
      Object.values(matching).reduce((sum, x) => sum + x, 0),
    );

    console.log(matching);
    expect(summedAmount).toBe(matchingAmount);
  });
  test.only("calculate extra matching", () => {
    const _contributions = [
      {
        grantId: "grantA",
        userId: "userA",
        amount: 10,
      },
      {
        grantId: "grantB",
        userId: "userB",
        amount: 5,
      },
      {
        grantId: "grantA",
        userId: "userB",
        amount: 1,
      },
    ];
    const checkoutContributions = [
      {
        amount: 5,
        grantId: "grantC",
        userId: "userA",
      },
      {
        amount: 3,
        grantId: "grantA",
        userId: "userA",
      },
    ];
    const matching = calculateMatchingForGrant(
      contributions,
      checkoutContributions,
      matchingAmount,
      "grantA",
    );

    console.log(matching);
    console.log(
      calculateMatchingForGrant(
        contributions,
        checkoutContributions,
        matchingAmount,
        "grantC",
      ),
    );
  });
});
