"use client";
import type { Round } from "@prisma/client";
import Image from "next/image";
import { Markdown } from "~/components/ui/markdown";
import { api } from "~/trpc/react";
import { formatMoney } from "~/utils/formatMoney";

export function RoundDetails({
  id,
  name,
  image,
  fundedAmount,
  currency,
  description,
  stripeAccount,
}: Round) {
  return (
    <div className="mb-8">
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
        {stripeAccount && (
          <div className="mx-auto">
            <div className="text-sm text-gray-600">Funded amount</div>
            <div className="text-center text-2xl font-semibold leading-none text-green-500">
              {formatMoney(fundedAmount, currency)}
            </div>
          </div>
        )}
      </div>

      <Markdown>{description}</Markdown>
    </div>
  );
}
