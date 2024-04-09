"use client";

import { api } from "~/trpc/react";
import { LoadingGrid } from "~/components/loading-grid";
import { type TFilterSchema } from "~/server/api/routers/round/round.schemas";
import { GrantCard } from "./grant-card";

export function DiscoverGrants({
  sortBy,
  order,
  search,
  limit,
}: Partial<TFilterSchema>) {
  const grants = api.grant.list.useQuery({ sortBy, order, search, limit });
  return (
    <LoadingGrid
      limit={limit}
      {...grants}
      renderItem={(grant, { isLoading }) => (
        <GrantCard key={grant.id} isLoading={isLoading} grant={grant} />
      )}
    />
  );
}
