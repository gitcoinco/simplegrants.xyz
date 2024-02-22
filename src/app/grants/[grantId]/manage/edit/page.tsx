import { notFound } from "next/navigation";
import { api } from "~/trpc/server";
import GrantFormWrapper from "~/app/grants/_components/grant-form-wrapper";

export default async function EditGrantPage({
  params,
}: {
  params: { grantId: string };
}) {
  const grant = await api.grant.get.query({ id: params.grantId });
  if (!grant) return notFound();
  return <GrantFormWrapper grant={grant} />;
}
