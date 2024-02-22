import Link from "next/link";
import { notFound } from "next/navigation";
import { Settings2 } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";

import { api } from "~/trpc/server";
import { Button } from "~/components/ui/button";
import { RoundApply } from "../_components/round-apply";
import { PageSection } from "~/app/(layout)/_components/page-section";
import { DiscoverGrants } from "~/app/grants/_components/discover-grants";
import { RoundDetails } from "../_components/round-details";

type Props = {
  params: { roundId: string };
};

export default async function RoundPage({ params: { roundId } }: Props) {
  const round = await api.round.get.query({ id: roundId });
  const user = await currentUser();
  if (!round) {
    return notFound();
  }

  const approvedApplications = await api.grant.approved.query({ roundId });
  const grants = approvedApplications.map((a) => a.grant);
  return (
    <PageSection
      title={round.name}
      action={
        <>
          {!user
            ? null
            : user.id === round.userId && (
                <>
                  <Button
                    icon={Settings2}
                    as={Link}
                    href={`/rounds/${roundId}/manage`}
                  >
                    Manage round
                  </Button>
                </>
              )}

          <Button as={Link} href={`/rounds/${roundId}?action=apply`}>
            Apply to Round
          </Button>
          <RoundApply roundId={roundId} />
        </>
      }
    >
      <RoundDetails {...round} />

      <h3 className="mb-2 text-xl font-semibold">Applied grants</h3>
      <DiscoverGrants grants={grants} />
    </PageSection>
  );
}
