import { notFound } from "next/navigation";
import { api } from "~/trpc/server";
import { PageSection } from "~/app/(layout)/_components/page-section";
import { GrantDetails } from "../../_components/grant-details";
import { Button } from "~/components/ui/button";
import { Check } from "lucide-react";

export default async function ReviewGrantPage({
  params,
}: {
  params: { grantId: string };
}) {
  const grant = await api.grant.get.query({ id: params.grantId });
  if (!grant) return notFound();
  return (
    <PageSection
      title={`Review: ${grant.name}`}
      action={
        <Button icon={Check} disabled>
          Approve
        </Button>
      }
    >
      <GrantDetails {...grant} />
    </PageSection>
  );
}
