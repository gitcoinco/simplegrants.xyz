"use client";
import type { Grant } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { api } from "~/trpc/react";
import { formatMoney } from "~/utils/formatMoney";

export function GrantCard({
  grant,
  isLoading,
}: {
  grant?: Grant;
  isLoading: boolean;
}) {
  if (isLoading)
    return <div className="h-72 animate-pulse rounded-xl bg-gray-100" />;
  if (!grant) return null;
  const { id, name, image } = grant;
  return (
    <Link href={`/grants/${id}`} className="min-h-72 border">
      <div className="relative aspect-video">
        <Image
          alt={name}
          src={image}
          sizes="500px"
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <div className="p-2">
        <h3 className="truncate text-xl font-semibold">{name}</h3>
        <FundedAmount grantId={grant.id} />
      </div>
    </Link>
  );
}

function FundedAmount({ grantId = "" }) {
  const contributions = api.grant.funding.useQuery({ ids: [grantId] });

  const funding = useMemo(
    () => contributions.data?.reduce((sum, x) => (sum += x.amount), 0) ?? 0,
    [contributions.data],
  );

  return <>{formatMoney(funding, "usd")}</>;
}
