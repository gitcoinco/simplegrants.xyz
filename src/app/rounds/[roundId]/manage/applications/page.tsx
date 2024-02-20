import { api } from "~/trpc/server";
import { notFound } from "next/navigation";
import { RoundApplicationsApprove } from "~/app/rounds/_components/round-applications-approve";

export default async function RoundApplicationsPage({
  params: { roundId },
}: {
  params: { roundId: string };
}) {
  const round = await api.round.get.query({ id: roundId });
  const applications = await api.application.list.query({
    roundId,
    showAll: true,
  });

  if (!round) return notFound();

  return (
    <RoundApplicationsApprove roundId={roundId} applications={applications} />
  );
}
