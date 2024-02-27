import { api } from "~/trpc/server";
import { notFound } from "next/navigation";
import RoundFormWrapper from "../../../_components/round-form-wrapper";
import { currentUser } from "@clerk/nextjs";

export default async function EditRoundPage({
  params: { roundId },
}: {
  params: { roundId: string };
}) {
  const round = await api.round.get.query({ id: roundId });
  if (!round) return notFound();
  const user = await currentUser();
  console.log(user);
  return (
    <div>
      <RoundFormWrapper
        round={round}
        stripeAccount={user?.privateMetadata.stripeAccount as string}
      />
    </div>
  );
}
