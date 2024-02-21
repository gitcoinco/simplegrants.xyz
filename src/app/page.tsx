import { api } from "~/trpc/server";
import { DiscoverRounds } from "./rounds/_components/discover-rounds";
import { DiscoverGrants } from "./grants/_components/discover-grants";

export default async function LandingPage() {
  const rounds = await api.round.list.query();
  const grants = await api.grant.list.query();

  return (
    <main>
      <div className="mx-auto max-w-screen-md items-center space-y-6 py-24 text-center">
        <h1 className="text-balance text-5xl font-semibold leading-snug">
          Empowering the next generation of changemakers
        </h1>
        <h3 className="text-2xl">
          Join us in making an impact throught quadratic funding
        </h3>
      </div>
      <h3>Active Rounds</h3>
      <DiscoverRounds rounds={rounds} />
      <h3>Popular Grants</h3>
      <DiscoverGrants grants={grants} />
    </main>
  );
}
