import { api } from "~/trpc/server";

import { DiscoverRounds } from "./_components/discover-rounds";
import { PageSection } from "../(layout)/_components/page-section";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { SearchWithFilter } from "~/components/search-filter";

export default async function DiscoverRoundsPage() {
  return (
    <PageSection
      title="Discover Rounds"
      action={
        <Button as={Link} href="/rounds/create" icon={Plus}>
          Create Round
        </Button>
      }
    >
      <SearchWithFilter />
      <DiscoverRounds />
    </PageSection>
  );
}
