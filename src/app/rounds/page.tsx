import { api } from "~/trpc/server";

import { DiscoverRounds } from "./_components/discover-rounds";
import { PageLayout } from "../(layout)/_components/page";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function DiscoverRoundsPage() {
  const rounds = await api.round.list.query();

  return (
    <PageLayout
      title="Discover Rounds"
      action={
        <Button as={Link} href="/rounds/create" icon={Plus}>
          Create Round
        </Button>
      }
    >
      <DiscoverRounds rounds={rounds} />
    </PageLayout>
  );
}
