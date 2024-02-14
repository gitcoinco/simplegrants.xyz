import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const ONE_DAY = 1000 * 3600 * 24;
const ONE_MONTH = ONE_DAY * 30;
const rounds = Array.from({ length: 10 })
  .fill(0)
  .map((_, i) => ({
    name: `Round ${i + 1}`,
    description: `Round description...`,
    startsAt: new Date(Date.now() + ONE_DAY * i),
    endsAt: new Date(Date.now() + ONE_MONTH * i),
    image: "https://source.unsplash.com/random",
    distributionType: "quadratic-funding",
  }));

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "alice@prisma.io",
      name: "Alice",
      rounds: {
        create: rounds.slice(0, 3),
      },
    },
  });
  const bob = await prisma.user.upsert({
    where: { email: "bob@prisma.io" },
    update: {},
    create: {
      email: "bob@prisma.io",
      name: "Bob",
      rounds: {
        create: rounds.slice(4, 10),
      },
    },
  });
  console.log({ alice, bob });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
