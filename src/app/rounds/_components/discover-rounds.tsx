"use client";
import type { Application, Round } from "@prisma/client";
import { Clock, FunctionSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LoadingGrid } from "~/components/loading-grid";
import { Badge } from "~/components/ui/badge";
import { useFilter } from "~/hooks/useFilter";
import { distributionTypeLabels } from "~/server/api/routers/round/round.schemas";
import { api } from "~/trpc/react";
import { endsIn, formatDate } from "~/utils/date";
import { formatMoney } from "~/utils/formatMoney";

export function DiscoverRounds({}) {
  const { sortBy, order, search } = useFilter();
  const rounds = api.round.list.useQuery(
    { sortBy, order, search },
    { retry: 0 },
  );

  return (
    <div>
      <LoadingGrid
        {...rounds}
        renderItem={(round, { isLoading }) => (
          <RoundCard key={round.id} isLoading={isLoading} round={round} />
        )}
      />
    </div>
  );
}

function RoundCard({
  round,
  isLoading,
}: {
  round?: Round & { applications: Application[] };
  isLoading: boolean;
}) {
  if (isLoading)
    return <div className="h-72 animate-pulse rounded-xl bg-gray-100" />;
  if (!round) return null;
  const {
    id,
    name,
    image,
    distributionType,
    startsAt,
    endsAt,
    fundedAmount,
    currency,
    applications,
  } = round;

  console.log(applications);
  return (
    <Link href={`/rounds/${id}`} className="min-h-72 rounded-xl border">
      <div className="relative aspect-video ">
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
      <div className="space-y-2 px-2 py-3">
        <h3 className="truncate text-lg font-semibold">{name}</h3>
        <div className="flex items-center gap-2">
          <div className="text-xl font-semibold">
            {formatMoney(fundedAmount, currency)}
          </div>
          <div>funded</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xl font-semibold">{applications.length}</div>
          <div>grants</div>
        </div>
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
