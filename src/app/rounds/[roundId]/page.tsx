import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { api } from "~/trpc/server";
import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";
import { RoundApply } from "../_components/round-apply";

type Props = {
  params: { roundId: string };
};

export default async function RoundPage({ params: { roundId } }: Props) {
  const round = await api.round.get.query({ id: roundId });
  const session = await getServerAuthSession();
  if (!round) {
    return notFound();
  }
  const grants = await api.session.grants.query();
  const { name, image, description } = round;
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{round.name}</h1>
        <div className="flex gap-2">
          {session?.user.id === round.createdById && (
            <>
              <Button
                variant="primary"
                as={Link}
                href={`/rounds/${roundId}/manage`}
              >
                Manage
              </Button>
            </>
          )}
          <Button
            variant="primary"
            as={Link}
            href={`/rounds/${roundId}?action=apply`}
          >
            Apply to Round
          </Button>
          <RoundApply grants={grants} roundId={roundId}></RoundApply>
        </div>
      </div>
      <div className="relative h-72">
        <Image
          alt={name}
          src={image}
          sizes="1024px"
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </div>

      <div>{description}</div>
    </div>
  );
}
