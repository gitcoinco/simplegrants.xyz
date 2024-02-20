import { test as base } from "@playwright/test";

// import { createUsersFixture } from "playwright/fixtures/users";

export interface Fixtures {
  // users: ReturnType<typeof createUsersFixture>;
}

export const test = base.extend<Fixtures>({
  // users: async ({ page, context }, use, workerInfo) => {
  //   const usersFixture = createUsersFixture(page, workerInfo);
  //   await use(usersFixture);
  // },
});
