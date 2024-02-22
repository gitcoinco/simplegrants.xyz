import { api } from "~/trpc/server";
import { notFound } from "next/navigation";
import { RoundDelete } from "../../_components/round-delete";

export default async function RoundManagePage({
  params: { roundId },
}: {
  params: { roundId: string };
}) {
  const round = await api.round.get.query({ id: roundId });
  if (!round) return notFound();
  return (
    <div>
      <RoundDelete roundId={roundId} />
    </div>
  );
}
