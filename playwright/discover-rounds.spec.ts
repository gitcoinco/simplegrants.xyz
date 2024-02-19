import { test, expect } from "@playwright/test";

test.describe("Discover Rounds", () => {
  test("loads page", async ({ page }) => {
    await page.goto("/rounds");
  });
});
