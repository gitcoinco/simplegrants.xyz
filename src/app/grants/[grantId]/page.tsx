import { notFound } from "next/navigation";
import Link from "next/link";
import { Edit } from "lucide-react";

import { api } from "~/trpc/server";

import { Button } from "~/components/ui/button";
import { AddToCartButton } from "~/app/checkout/_components/add-to-cart";
import { PageSection } from "~/app/(layout)/_components/page-section";
import { GrantDetails } from "../_components/grant-details";
import { currentUser } from "@clerk/nextjs";

type Props = {
  params: { grantId: string };
};

export default async function GrantPage({ params }: Props) {
  const grant = await api.grant.get.query({ id: params.grantId });
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
              icon={Edit}
              as={Link}
              href={`/grants/${params.grantId}/edit`}
            >
              Edit grant
            </Button>
          )}
          <AddToCartButton grantId={grant.id} />
        </div>
      }
    >
      <GrantDetails {...grant} />
    </PageSection>
  );
}
