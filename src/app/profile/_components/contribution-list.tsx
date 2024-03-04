"use client";

import type { Contribution, Grant } from "@prisma/client";
import { formatRelative } from "date-fns";
import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatMoney } from "~/utils/formatMoney";

export function ContributionList({
  contributions,
}: {
  contributions: (Contribution & { grant: Grant })[];
}) {
  return (
    <div className="flex flex-col gap-2">
      {contributions.map((contrib) => (
        <Link
          key={contrib.id}
          href={`/grants/${contrib.grant.id}`}
          className="flex rounded border"
        >
          <div className="relative aspect-video w-48">
            <Image
              alt={contrib.grant.name}
              src={contrib.grant.image}
              sizes="300px"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="flex-1 p-2">
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold">{contrib.grant.name}</h3>
              <div className="font-semibold text-gray-600">
                {formatMoney(contrib.amount, "usd")}
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Clock className="size-4" />
              {formatRelative(contrib.updatedAt, new Date())}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
