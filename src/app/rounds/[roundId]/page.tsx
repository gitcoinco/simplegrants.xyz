import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { api } from "~/trpc/server";
import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";
import { RoundApply } from "../_components/round-apply";
import { PageLayout } from "~/app/(layout)/_components/page";
import { Settings2 } from "lucide-react";

type Props = {
  params: { roundId: string };
};

export default async function RoundPage({ params: { roundId } }: Props) {
  const round = await api.round.get.query({ id: roundId });
  const session = await getServerAuthSession();
  if (!round) {
    return notFound();
  }
  const { name, image, description } = round;
  return (
    <PageLayout
      title={round.name}
      action={
        !session ? null : session.user.id === round.createdById ? (
          <>
            <Button
              icon={Settings2}
              variant="primary"
              as={Link}
              href={`/rounds/${roundId}/manage`}
            >
              Manage round
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="primary"
              as={Link}
              href={`/rounds/${roundId}?action=apply`}
            >
              Apply to Round
            </Button>
            <RoundApply roundId={roundId} />
          </>
        )
      }
    >
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
    </PageLayout>
  );
}
