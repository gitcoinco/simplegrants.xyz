"use client";
import type { Grant } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import { LoadingGrid } from "~/components/loading-grid";
import { useFilter } from "~/hooks/useFilter";
import { api } from "~/trpc/react";

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

function GrantCard({
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
      </div>
    </Link>
  );
}
