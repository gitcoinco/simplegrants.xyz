"use client";
import type { Round } from "@prisma/client";
import { Clock, FunctionSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { useDebouncedFilter } from "~/hooks/useFilter";
import { distributionTypeLabels } from "~/server/api/routers/round/round.schemas";
import { api } from "~/trpc/react";
import { endsIn, formatDate } from "~/utils/date";

export function DiscoverRounds({}) {
  const { sortBy, order, search } = useDebouncedFilter();
  const rounds = api.round.list.useQuery({ sortBy, order, search });
  return (
    <div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {rounds.isLoading ? (
          <div>loading...</div>
        ) : !rounds.data?.length ? (
          <div>no results</div>
        ) : null}
        {rounds.data?.map((round) => <RoundCard key={round.id} {...round} />)}
      </div>
    </div>
  );
}

function RoundCard({
  id,
  name,
  image,
  distributionType,
  startsAt,
  endsAt,
}: Round) {
  return (
    <Link href={`/rounds/${id}`} className="rounded-xl border">
      <div className="relative aspect-square ">
        <Badge className="absolute right-2 top-2 z-10">
          Ends in {endsIn(endsAt)}
        </Badge>
        <Image
          alt={name}
          src={image}
          sizes="500px"
          fill
          className="rounded-t-xl"
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <div className="px-2 py-3">
        <h3 className="mb-2 truncate text-lg font-semibold">{name}</h3>
        <div className="flex flex-wrap gap-1">
          <Badge>
            <FunctionSquare className="size-4" />
            {distributionTypeLabels[distributionType]}
          </Badge>
          <Badge>
            <Clock className="size-4" /> {formatDate(startsAt)} -{" "}
            {formatDate(endsAt)}
          </Badge>
        </div>
      </div>
    </Link>
  );
}
