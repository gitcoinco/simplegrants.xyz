import { expect } from "@playwright/test";
import { test } from "./lib/fixtures";

test.afterEach(({}) => {
  //
});

test.describe("Rounds", () => {
  test("Discover Rounds Flow", async ({ page }) => {
    await page.goto("/rounds");
  });
});
