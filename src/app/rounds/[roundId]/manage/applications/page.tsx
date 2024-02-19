import { api } from "~/trpc/server";
import { notFound } from "next/navigation";

export default async function RoundApplicationsPage({
  params: { roundId },
}: {
  params: { roundId: string };
}) {
  const round = await api.round.get.query({ id: roundId });
  const applications = await api.application.list.query({ roundId });

  if (!round) return notFound();

  return (
    <div>
      {applications.map((application) => (
        <div key={application.id}>{application.grant.name}</div>
      ))}
    </div>
  );
}
