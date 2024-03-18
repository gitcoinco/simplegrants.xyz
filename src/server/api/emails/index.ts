import type { ReactNode } from "react";
import { clerkClient } from "@clerk/nextjs";
import { type User } from "@clerk/nextjs/server";

import { db } from "~/server/db";
import { GrantApplies } from "./templates/GrantApplies";
import { GrantDonationSent } from "./templates/GrantDonationSent";
import { GrantDonationReceived } from "./templates/GrantDonationReceived";
import { resend } from "~/server/resend";

export async function sendEmail({
  to,
  subject,
  template,
}: {
  to: string[];
  subject: string;
  template: ReactNode;
}) {
  const { data, error } = await resend.emails.send({
    from: "Simplegrants.xyz <noreply@simplegrants.xyz>",
    to,
    subject,
    react: template!,
  });
  if (error) {
    console.log(error);
  }
  return data;
}

function parseUserEmails(user: User) {
  return user.emailAddresses.map((addr) => addr.emailAddress);
}

export async function sendGrantAppliesToRoundEmail(params: {
  grantId: string;
  roundId: string;
}) {
  const [grant, round] = await Promise.all([
    db.grant.findFirstOrThrow({
      where: { id: params.grantId },
      select: { name: true },
    }),
    db.round.findFirstOrThrow({
      where: { id: params.roundId },
      select: { userId: true, name: true },
    }),
  ]);

  const user = await clerkClient.users.getUser(round?.userId);

  return sendEmail({
    to: parseUserEmails(user),
    subject: "New grant application!",
    template: GrantApplies({ grantName: grant.name, roundName: round.name }),
  });
}

export async function sendGrantDonationSentEmail(params: { userId: string }) {
  const user = await clerkClient.users.getUser(params.userId);

  return sendEmail({
    to: parseUserEmails(user),
    subject: "Donation to grant sent!",
    template: GrantDonationSent(),
  });
}

export async function sendGrantDonationsReceivedEmail(
  contributionTransferGroup: string,
) {
  const grants = await db.contribution.findMany({
    where: { transferGroup: contributionTransferGroup },
    select: { grant: { select: { id: true, name: true, userId: true } } },
  });

  await Promise.all(
    grants.map(async ({ grant }) => {
      const user = await clerkClient.users.getUser(grant.userId);

      return sendEmail({
        to: parseUserEmails(user),
        subject: "Donation to grant received!",
        template: GrantDonationReceived({ grantName: grant.name }),
      });
    }),
  );
}
