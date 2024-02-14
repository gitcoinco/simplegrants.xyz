import { api } from "~/trpc/server";

import { DiscoverRounds } from "./_components/discover-rounds";

export default async function DiscoverRoundsPage() {
  const rounds = await api.round.list.query();

  console.log("rounds", rounds);
  return (
    <div>
      <h1>Discover Rounds</h1>
      <DiscoverRounds rounds={rounds} />
    </div>
  );
}
