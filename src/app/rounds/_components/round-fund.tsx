"use client";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

export function RoundFund({ id = "" }) {
  const router = useRouter();
  const fund = api.round.fund.useMutation({
    onSuccess: ({ url }) => url && router.push(url),
  });
  return (
    <Button
      variant="primary"
      isLoading={fund.isLoading}
      className="w-full"
      onClick={() =>
        fund.mutate({ id, amount: 10_000, successUrl: `/rounds/${id}` })
      }
    >
      Fund pool
    </Button>
  );
}
