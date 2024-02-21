"use client";
import type { Round } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Markdown } from "~/components/ui/markdown";
import { api } from "~/trpc/react";
import { formatMoney } from "~/utils/formatMoney";

export function RoundDetails({ id, name, image, description }: Round) {
  const router = useRouter();
  const fund = api.round.fund.useMutation({
    onSuccess: ({ url }) => url && router.push(url),
  });
  return (
    <div className="mb-8">
      <div className="relative mb-4 h-72 flex-1">
        <Image
          alt={name}
          src={image}
          sizes="1024px"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="mb-4 gap-4 md:flex">
        <div className="mx-auto">
          <div className="text-sm text-gray-600">Funded amount</div>
          <div className="text-center text-2xl font-semibold leading-none text-green-500">
            <RoundAmount id={id} />
          </div>
        </div>
      </div>

      <Markdown>{description}</Markdown>
    </div>
  );
}

function RoundAmount({ id = "" }) {
  const balance = api.round.balance.useQuery({ id });

  console.log(balance.data);
  if (!balance.data)
    return (
      <div className="inline-flex animate-pulse bg-gray-200 text-transparent">
        10000
      </div>
    );
  const { amount, currency } = balance.data;
  return <>{formatMoney(amount, currency)}</>;
}
