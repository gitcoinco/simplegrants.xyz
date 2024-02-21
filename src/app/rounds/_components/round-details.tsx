"use client";
import type { Round } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Markdown } from "~/components/ui/markdown";
import { api } from "~/trpc/react";

export function RoundDetails({ id, name, image, description }: Round) {
  const router = useRouter();
  const fund = api.round.fund.useMutation({
    onSuccess: ({ url }) => url && router.push(url),
  });
  return (
    <div className="mb-8">
      <div className="mb-8 gap-4 md:flex">
        <div className="relative mb-4 h-72 flex-1">
          <Image
            alt={name}
            src={image}
            sizes="1024px"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="mx-auto max-w-sm md:w-64">
          <div className="mb-4">
            <div className="text-2xl font-semibold leading-none text-green-500">
              USD 0
            </div>
            <div className="text-sm text-gray-500">Funded amount</div>
          </div>
          <Button
            variant="primary"
            isLoading={fund.isLoading}
            className="w-full"
            onClick={() =>
              fund.mutate({
                id,
                amount: 10_000,
                successUrl: `/rounds/${id}`,
              })
            }
          >
            Fund pool
          </Button>
        </div>
      </div>

      <Markdown>{description}</Markdown>
    </div>
  );
}
