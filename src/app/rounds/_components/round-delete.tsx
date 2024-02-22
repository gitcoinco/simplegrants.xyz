"use client";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

export function RoundDelete({ roundId }: { roundId: string }) {
  const router = useRouter();
  const remove = api.round.delete.useMutation({
    onSuccess: () => router.push(`/rounds`),
  });
  return (
    <Button
      isLoading={remove.isLoading}
      variant="danger"
      onClick={() => {
        if (window.confirm("Are you sure you want to delete this round?")) {
          remove.mutate({ id: roundId });
        }
      }}
    >
      Delete round
    </Button>
  );
}
