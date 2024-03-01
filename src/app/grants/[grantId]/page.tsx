import { notFound } from "next/navigation";
import Link from "next/link";
import { Edit, Settings2 } from "lucide-react";

import { api } from "~/trpc/server";

import { Button } from "~/components/ui/button";
import { AddToCartButton } from "~/app/checkout/_components/add-to-cart";
import { PageSection } from "~/app/(layout)/_components/page-section";
import { GrantDetails } from "../_components/grant-details";
import { currentUser } from "@clerk/nextjs";
import { GrantSidebar } from "../_components/grant-sidebar";

type Props = {
  params: { grantId: string };
};

export default async function GrantPage({ params: { grantId } }: Props) {
  const grant = await api.grant.get.query({ id: grantId });
  if (!grant) {
    return notFound();
  }
  const session = await currentUser();
  return (
    <PageSection
      title={grant.name}
      action={
        <div className="flex gap-2">
          {grant.userId === session?.id && (
            <Button
              icon={Settings2}
              as={Link}
              href={`/grants/${grantId}/manage`}
            >
              Manage grant
            </Button>
          )}
        </div>
      }
    >
      <div className="flex-row-reverse gap-2 md:flex ">
        <GrantSidebar {...grant} />
        <GrantDetails {...grant} />
      </div>
    </PageSection>
  );
}
