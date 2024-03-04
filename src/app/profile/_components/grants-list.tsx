"use client";

import type { Grant } from "@prisma/client";
import { GrantCard } from "~/app/grants/_components/grant-card";

export function GrantsList({ grants }: { grants: Grant[] }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {grants.map((grant) => (
        <GrantCard key={grant.id} grant={grant} />
      ))}
    </div>
  );
}
