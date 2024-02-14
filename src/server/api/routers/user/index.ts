import { type PrismaClient } from "@prisma/client";

export async function getUser(id: string, db: PrismaClient) {
  return db.user.findFirst({ where: { id } });
}
