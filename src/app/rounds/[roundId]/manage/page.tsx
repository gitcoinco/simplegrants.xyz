import { api } from "~/trpc/server";
import { notFound } from "next/navigation";

export default async function RoundManagePage({
  params,
}: {
  params: { roundId: string };
}) {
  const round = await api.round.get.query({ id: params.roundId });
  if (!round) return notFound();
  return <div>Round manage</div>;
}
