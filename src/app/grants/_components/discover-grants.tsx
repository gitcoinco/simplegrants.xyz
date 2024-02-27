"use client";

import { LoadingGrid } from "~/components/loading-grid";
import { useFilter } from "~/hooks/useFilter";
import { api } from "~/trpc/react";
import { GrantCard } from "./grant-card";

export function DiscoverGrants() {
  const { sortBy, order, search } = useFilter();
  const grants = api.grant.list.useQuery({ sortBy, order, search });
  return (
    <div>
      <LoadingGrid
        {...grants}
        renderItem={(grant, { isLoading }) => (
          <GrantCard key={grant.id} isLoading={isLoading} grant={grant} />
        )}
      />
    </div>
  );
}
