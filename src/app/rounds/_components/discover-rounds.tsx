import { api } from "~/trpc/server";

import type { Round, User } from "@prisma/client";
import Image from "next/image";
import { formatDate } from "~/utils/date";

type RoundProps = Round & {
  createdBy: User;
};
export function DiscoverRounds({ rounds }: { rounds: RoundProps[] }) {
  console.log("rounds", rounds);
  return (
    <div>
      <h1>Discover Rounds</h1>
      <div className="grid gap-2 md:grid-cols-3">
        {rounds.map((round) => (
          <RoundCard key={round.id} {...round} />
        ))}
      </div>
    </div>
  );
}

function RoundCard({
  name,
  description,
  image,
  startsAt,
  endsAt,
  createdBy,
}: RoundProps) {
  return (
    <div className="border">
      <Image alt={name} width={420} height={420} src={image} />
      <div className="p-2">
        <h3 className="text-lg font-semibold">{name}</h3>
        <div className="text-gray-600">{createdBy.name}</div>
        <div>{description}</div>
        <div>
          {formatDate(startsAt)} - {formatDate(endsAt)}
        </div>
      </div>
    </div>
  );
}
