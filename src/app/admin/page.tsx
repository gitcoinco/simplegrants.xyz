import { api } from "~/trpc/server";
import { ApproveRounds } from "./_components/approve-rounds";

export default async function AdminApproveRoundsPage() {
  const rounds = await api.admin.rounds.query();
  return <ApproveRounds rounds={rounds} />;
}
