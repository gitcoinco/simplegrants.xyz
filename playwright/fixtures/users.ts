import type { Page, WorkerInfo } from "@playwright/test";
import type Prisma from "@prisma/client";
import { Prisma as PrismaType } from "@prisma/client";
import { db } from "~/server/db";

const WEBAPP_URL = "http://localhost:3000";

const userIncludes = PrismaType.validator<PrismaType.UserInclude>()({});

type UserFixture = ReturnType<typeof createUserFixture>;
type UserWithIncludes = PrismaType.UserGetPayload<typeof userIncludes>;

const createUserFixture = (user: UserWithIncludes, page: Page) => {
  const store = { user, page };

  // self is a reflective method that return the Prisma object that references this fixture.
  const self = async () =>
    (await db.user.findUnique({
      where: { id: store.user.id },
    }))!;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    self,
    apiLogin: async () =>
      apiLogin({ ...(await self()), password: user.username }, store.page),
    logout: async () => {
      await page.goto("/auth/logout");
    },

    delete: async () => await db.user.delete({ where: { id: store.user.id } }),
  };
};

export const createUsersFixture = (page: Page, workerInfo: WorkerInfo) => {
  const store = { users: [], page } as {
    users: UserFixture[];
    page: typeof page;
  };
  return {
    create: async () => {
      console.log("creating user");
      const _user = await db.user.create({
        data: {},
        include: {},
      });

      const user = await db.user.findUniqueOrThrow({
        where: { id: _user.id },
        include: userIncludes,
      });
      const userFixture = createUserFixture(user, store.page);
      store.users.push(userFixture);
      return userFixture;
    },
    deleteAll: async () => {
      const ids = store.users.map((u) => u.id);
      await db.user.deleteMany({ where: { id: { in: ids } } });
      store.users = [];
    },
  };
};

export async function apiLogin(
  user: Pick<Prisma.User, "name"> &
    Partial<Pick<Prisma.User, "email">> & { password: string | null },
  page: Page,
) {
  const csrfToken = await page
    .context()
    .request.get("/api/auth/csrf")
    .then((response) => response.json())
    .then((json) => json.csrfToken);

  const data = {
    email: user.email ?? `${user.name}@example.com`,
    password: user.password ?? user.name,
    callbackURL: WEBAPP_URL,
    redirect: "false",
    json: "true",
    csrfToken,
  };
  return page.context().request.post("/api/auth/callback/credentials", {
    data,
  });
}
