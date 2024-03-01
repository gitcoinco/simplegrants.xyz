import { describe, expect, test } from "vitest";
import {
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
});
