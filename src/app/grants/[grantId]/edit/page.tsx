import { notFound } from "next/navigation";
import { api } from "~/trpc/server";
import GrantFormWrapper from "../../_components/grant-form-wrapper";
import { PageSection } from "~/app/(layout)/_components/page-section";

export default async function EditGrantPage({
  params,
}: {
  params: { grantId: string };
}) {
  const grant = await api.grant.get.query({ id: params.grantId });
  if (!grant) return notFound();
  return (
    <PageSection backLink={`/grants/${grant.id}`} title={`Edit ${grant.name}`}>
      <GrantFormWrapper grant={grant} />
    </PageSection>
  );
}
