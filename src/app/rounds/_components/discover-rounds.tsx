import type { Round } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "~/utils/date";

export function DiscoverRounds({ rounds }: { rounds: Round[] }) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {rounds.map((round) => (
          <RoundCard key={round.id} {...round} />
        ))}
      </div>
    </div>
  );
}

function RoundCard({ id, name, image, startsAt, endsAt }: Round) {
  return (
    <Link href={`/rounds/${id}`} className="border">
      <div className="relative aspect-square">
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
        <div>
          {formatDate(startsAt)} - {formatDate(endsAt)}
        </div>
      </div>
    </Link>
  );
}
