import { DiscoverGrants } from "./_components/discover-grants";
import { PageSection } from "../(layout)/_components/page-section";
import { Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { SearchWithFilter } from "~/components/search-filter";

export default async function DiscoverGrantsPage() {
  return (
    <PageSection
      title="Discover Grants"
      action={
        <Button as={Link} href="/grants/create" icon={Plus}>
          Create Grant
        </Button>
      }
    >
      <SearchWithFilter
        searchPlaceholder="Search grants..."
        sortOptions={[
          {
            value: "name",
            label: "Name",
          },
          {
            value: "createdAt",
            label: "Created date",
          },
        ]}
      />
      <DiscoverGrants />
    </PageSection>
  );
}
