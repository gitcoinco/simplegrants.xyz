import { PrismaClient } from "@prisma/client";
import { addDays } from "date-fns";
const prisma = new PrismaClient();
async function main() {
  const userId = "user_2cLtZLW6nru6glPPXTdQEksskLT";

  const image1 =
    "https://emlgvr26jnatgaie.public.blob.vercel-storage.com/9D8s5zg-Rv6r0ztNCMKryICDSgWQ1QiQk2sKo2.jpeg";
  const image2 =
    "https://emlgvr26jnatgaie.public.blob.vercel-storage.com/dgzPm47-8Vky8DFl8khd7dcVyqYN1zM1OHzrvV.jpeg";
  const defaults = {
    stripeAccount: "acct_1OmZflE2yfQDYiJe",
    currency: "usd",
    distributionType: "quadratic_funding",
    userId,
  };
  await prisma.round.create({
    data: {
      ...defaults,
      startsAt: addDays(new Date(), 0),
      endsAt: addDays(new Date(), 30),
      image: image1,
      name: "Sustainable Urban Development Fund 2024",
      description: `## Overview
Welcome to the Sustainable Urban Development Fund 2024, a grant program dedicated to supporting innovative projects that promote sustainable and eco-friendly urban development. We are seeking visionary individuals, teams, and organizations that are committed to creating greener, more sustainable urban environments.

## Eligibility Criteria
- Open to [individuals/organizations/both].
- Applicants must be [age/nationality/other relevant criteria].
- Projects must focus on [urban sustainability, green infrastructure, smart city solutions, etc.].
- Prior grantees are [eligible/ineligible] to apply.

## Evaluation Criteria
- Innovation: Uniqueness and creativity of the project.
- Impact: Potential to positively affect urban environments and communities.
- Feasibility: Practicality of the project plan and budget.
- Sustainability: Long-term benefits and sustainability of the project.
`,
    },
  });
  await prisma.round.create({
    data: {
      ...defaults,
      startsAt: addDays(new Date(), 10),
      endsAt: addDays(new Date(), 40),
      image: image2,
      name: "Regenerative Initiative Grants Round 2024",
      description: `## Overview
Welcome to the 2024 Regenerative Initiative Grants Round. Our mission is to support innovative projects and ideas that contribute to environmental regeneration and sustainable practices. We are looking for passionate individuals, teams, and organizations committed to making a positive impact on our planet.

## Eligibility Criteria
- Open to [individuals/organizations/both].
- Applicants must be [age/nationality/other relevant criteria].
- Projects must focus on [urban sustainability, green infrastructure, smart city solutions, etc.].
- Prior grantees are [eligible/ineligible] to apply.

## Evaluation Criteria
- Innovation: Uniqueness and creativity of the project.
- Impact: Potential to positively affect urban environments and communities.
- Feasibility: Practicality of the project plan and budget.
- Sustainability: Long-term benefits and sustainability of the project.
`,
    },
  });

  await prisma.grant.create({
    data: {
      name: "Test Grant",
      description: `Description`,
      image: image1,
      userId,
    },
  });
  await prisma.grant.create({
    data: {
      name: "Another Grant",
      description: `Description`,
      image: image2,
      userId,
    },
  });
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
