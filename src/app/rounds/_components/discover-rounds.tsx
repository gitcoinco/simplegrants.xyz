import type { Round, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "~/utils/date";

type RoundProps = Round & {
  createdBy: User;
};
export function DiscoverRounds({ rounds }: { rounds: RoundProps[] }) {
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

function RoundCard({
  id,
  name,
  description,
  image,
  startsAt,
  endsAt,
}: RoundProps) {
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
        <h3 className="text-xl font-semibold">{name}</h3>
        <div>{description}</div>
        <div>
          {formatDate(startsAt)} - {formatDate(endsAt)}
        </div>
      </div>
    </Link>
  );
}
