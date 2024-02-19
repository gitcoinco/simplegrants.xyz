import { api } from "~/trpc/server";

import { DiscoverGrants } from "./_components/discover-grants";
import { Page } from "../(layout)/_components/page";
import { Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export default async function DiscoverGrantsPage() {
  const grants = await api.grant.list.query();

  return (
    <Page
      title="Discover Grants"
      action={
        <Button as={Link} href="/grants/create" icon={Plus}>
          Create Grant
        </Button>
      }
    >
      <DiscoverGrants grants={grants} />
    </Page>
  );
}
