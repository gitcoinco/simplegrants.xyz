"use client";

import { api } from "~/trpc/react";
import { GrantCard } from "~/app/grants/_components/grant-card";
import { LoadingGrid } from "~/components/loading-grid";

export function RoundGrants({ roundId = "" }) {
  const grants = api.grant.approved.useQuery({ roundId });
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
