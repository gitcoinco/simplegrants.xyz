import { api } from "~/trpc/server";

import { DiscoverRounds } from "./_components/discover-rounds";
import { PageSection } from "../(layout)/_components/page-section";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function DiscoverRoundsPage() {
  const rounds = await api.round.list.query();

  return (
    <PageSection
      title="Discover Rounds"
      action={
        <Button as={Link} href="/rounds/create" icon={Plus}>
          Create Round
        </Button>
      }
    >
      <DiscoverRounds rounds={rounds} />
    </PageSection>
  );
}
