import { notFound } from "next/navigation";
import { api } from "~/trpc/server";
import { PageSection } from "~/app/(layout)/_components/page-section";
import { Button } from "~/components/ui/button";
import { Check } from "lucide-react";
import { RoundDetails } from "../../_components/round-details";

export default async function ReviewRoundPage({
  params,
}: {
  params: { grantId: string };
}) {
  const round = await api.round.get.query({ id: params.grantId });
  if (!round) return notFound();
  return (
    <PageSection
      title={`Review: ${round.name}`}
      action={
        <Button icon={Check} disabled>
          Approve
        </Button>
      }
    >
      <RoundDetails {...round} />
    </PageSection>
  );
}
