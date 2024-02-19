import { api } from "~/trpc/server";

import { DiscoverGrants } from "./_components/discover-grants";
import { PageLayout } from "../(layout)/_components/page-section";
import { Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export default async function DiscoverGrantsPage() {
  const grants = await api.grant.list.query();

  return (
    <PageLayout
      title="Discover Grants"
      action={
        <Button as={Link} href="/grants/create" icon={Plus}>
          Create Grant
        </Button>
      }
    >
      <DiscoverGrants grants={grants} />
    </PageLayout>
  );
}
