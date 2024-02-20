import { expect } from "@playwright/test";
import { test } from "./lib/fixtures";

test.afterEach(({ users }) => users.deleteAll());

test.describe("Rounds", () => {
  test("Discover Rounds Flow", async ({ page, users }) => {
    const user = await users.create();
    console.log(user);
    const s = await user.apiLogin();

    console.log(s);

    await page.goto("/rounds");

    console.log(users);
  });
});
