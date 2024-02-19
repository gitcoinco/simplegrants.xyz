import { notFound } from "next/navigation";
import { api } from "~/trpc/server";
import GrantFormWrapper from "../../_components/grant-form-wrapper";

export default async function EditGrantPage({
  params,
}: {
  params: { grantId: string };
}) {
  const grant = await api.grant.get.query({ id: params.grantId });
  if (!grant) return notFound();
  return (
    <div>
      Edit Grant page
      <GrantFormWrapper grant={grant} />
    </div>
  );
}
