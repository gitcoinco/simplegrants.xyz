"use client";
import { api } from "~/trpc/react";
import { formatMoney } from "~/utils/formatMoney";
import { Skeleton } from "~/components/ui/skeleton";

export function TotalFunding() {
  const { data, isLoading } = api.grant.funding.useQuery();

  return (
    <div className="flex flex-col items-center pb-8">
      <div className="text-sm uppercase tracking-wider">Total funding:</div>
      <div className="text-2xl font-semibold">
        <Skeleton className="h-8 w-24" isLoading={isLoading}>
          {formatMoney(data?.amount ?? 0, "usd")}
        </Skeleton>
      </div>
    </div>
  );
}
