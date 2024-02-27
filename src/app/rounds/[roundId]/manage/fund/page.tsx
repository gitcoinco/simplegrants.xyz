import { api } from "~/trpc/server";
import { notFound } from "next/navigation";
import { RoundFundForm } from "~/app/rounds/_components/round-fund";

export default async function FundRoundPage({
  params: { roundId },
}: {
  params: { roundId: string };
}) {
  const round = await api.round.get.query({ id: roundId });
  if (!round) return notFound();

  return (
    <div>
      <RoundFundForm round={round} />
    </div>
  );
}
