import { api } from "~/trpc/server";

import { DiscoverGrants } from "./_components/discover-grants";

export default async function DiscoverGrantsPage() {
  const grants = await api.grant.list.query();

  return (
    <div>
      <h1 className="text-2xl font-bold">Discover Grants</h1>
      <DiscoverGrants grants={grants} />
    </div>
  );
}
