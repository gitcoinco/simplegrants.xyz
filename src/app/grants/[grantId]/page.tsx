import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";

import { api } from "~/trpc/server";

import { Button } from "~/components/ui/button";
import { AddToCartButton } from "~/app/checkout/_components/add-to-cart";

type Props = {
  params: { grantId: string };
};

export default async function GrantPage({ params }: Props) {
  const grant = await api.grant.get.query({ id: params.grantId });
  if (!grant) {
    return notFound();
  }
  const { name, image, description, stripeAccount } = grant;
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{grant.name}</h1>
        <div className="flex gap-2">
          <Button
            variant="primary"
            as={Link}
            href={`/grants/${params.grantId}/edit`}
          >
            Edit
          </Button>
          <AddToCartButton grantId={grant.id} />
        </div>
      </div>
      <div className="relative h-72">
        <Image
          alt={name}
          src={image}
          sizes="1024px"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      <div>{description}</div>
      <div>{stripeAccount}</div>
    </div>
  );
}
