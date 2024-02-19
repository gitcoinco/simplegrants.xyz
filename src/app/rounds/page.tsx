import { api } from "~/trpc/server";

import { DiscoverRounds } from "./_components/discover-rounds";

export default async function DiscoverRoundsPage() {
  const rounds = await api.round.list.query();

  return (
    <div>
      <h1 className="text-2xl font-bold">Discover Rounds</h1>
      <DiscoverRounds rounds={rounds} />
    </div>
  );
}
