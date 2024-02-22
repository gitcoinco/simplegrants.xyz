import { api } from "~/trpc/server";
import { notFound } from "next/navigation";
import { GrantDelete } from "../../_components/grant-delete";

export default async function GrantManagePage({
  params: { grantId },
}: {
  params: { grantId: string };
}) {
  const grant = await api.grant.get.query({ id: grantId });
  if (!grant) return notFound();
  return (
    <div>
      <GrantDelete grantId={grantId} />
    </div>
  );
}
