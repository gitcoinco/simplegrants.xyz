"use client";
import type { Round } from "@prisma/client";
import Image from "next/image";
import { tv } from "tailwind-variants";
import { createComponent } from "~/components/ui";
import { Markdown } from "~/components/ui/markdown";
import { api } from "~/trpc/react";
import { formatDate } from "~/utils/date";
import { formatMoney } from "~/utils/formatMoney";

export function RoundDetails({
  id,
  name,
  image,
  fundedAmount,
  currency,
  description,
  startsAt,
  endsAt,
}: Round) {
  return (
    <div className="mb-8">
      <div>
        {formatDate(startsAt)} - {formatDate(endsAt)}
      </div>
      <div className="relative mb-4 h-80 flex-1">
        <Image
          alt={name}
          src={image}
          sizes="1280px"
          fill
          className="rounded"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="mb-4 gap-4 md:flex">
        <RoundStats
          roundId={id}
          fundedAmount={fundedAmount}
          currency={currency}
        />
      </div>

      <Markdown>{description}</Markdown>
    </div>
  );
}

function RoundStats({ roundId = "", fundedAmount = 0, currency = "" }) {
  const grants = api.grant.approved.useQuery({ roundId });
  const contributors = api.contribution.countForRound.useQuery({ roundId });

  return (
    <div className="mx-auto flex gap-8">
      <div>
        <StatLabel>Funded amount</StatLabel>
        <StatValue>{formatMoney(fundedAmount, currency)}</StatValue>
      </div>
      <div>
        <StatLabel>Contributors</StatLabel>
        <StatValue>{contributors.data?.length}</StatValue>
      </div>
      <div>
        <StatLabel>Grants</StatLabel>
        <StatValue>{grants.data?.length}</StatValue>
      </div>
    </div>
  );
}

const StatLabel = createComponent("div", tv({ base: "text-sm text-gray-600" }));
const StatValue = createComponent(
  "div",
  tv({
    base: "text-center text-2xl font-semibold leading-none text-green-500",
  }),
);
