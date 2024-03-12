"use client";
import type { Grant } from "@prisma/client";
import { Shapes } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/trpc/react";
import { formatMoney } from "~/utils/formatMoney";

export function GrantCard({
  grant,
  isLoading,
}: {
  grant?: Grant;
  isLoading?: boolean;
}) {
  const rounds = api.grant.rounds.useQuery(
    { ids: [String(grant?.id)] },
    { enabled: Boolean(grant?.id) },
  );
  if (isLoading)
    return <div className="h-72 animate-pulse rounded-xl bg-gray-100" />;
  if (!grant) return null;
  const { id, name, image } = grant;
  return (
    <Link href={`/grants/${id}`} className="min-h-72 rounded-xl border">
      <div className="relative aspect-video">
        <Image
          alt={name}
          src={image}
          sizes="500px"
          fill
          className="rounded-t-xl"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="space-y-2 px-2 py-3">
        <h3 className="truncate text-lg font-semibold">{name}</h3>
        <div className="flex items-center gap-2">
          <div className="text-xl font-semibold">
            <FundedAmount grantId={id} />
          </div>
          <div>raised</div>
        </div>
        <div className="flex flex-wrap gap-1">
          <Badge>
            <Shapes className="size-4" />
            {rounds.data?.length ?? "_"} rounds
          </Badge>
        </div>
      </div>
    </Link>
  );
}

function FundedAmount({ grantId = "" }) {
  const contributions = api.grant.funding.useQuery({ ids: [grantId] });
  const amount = contributions.data?.amount ?? 0;
  return (
    <Skeleton
      className="h-4 w-8 bg-gray-300"
      isLoading={contributions.isLoading}
    >
      {formatMoney(amount, "usd")}
    </Skeleton>
  );
}
