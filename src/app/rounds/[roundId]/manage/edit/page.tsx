import { api } from "~/trpc/server";
import { notFound } from "next/navigation";
import RoundFormWrapper from "../../../_components/round-form-wrapper";

export default async function EditRoundPage({
  params: { roundId },
}: {
  params: { roundId: string };
}) {
  const round = await api.round.get.query({ id: roundId });
  if (!round) return notFound();
  return (
    <div>
      Edit Grant page
      <RoundFormWrapper round={round} />
    </div>
  );
}
