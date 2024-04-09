import { PageSection } from "../(layout)/_components/page-section";
import { Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { SearchWithFilter } from "~/components/search-filter";
import { TotalFunding } from "./_components/total-funding";
import { SearchGrants } from "./_components/search-grants";

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
      <TotalFunding />
      <SearchGrants />
    </PageSection>
  );
}
