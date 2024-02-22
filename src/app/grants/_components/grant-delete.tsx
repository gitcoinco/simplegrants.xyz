"use client";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

export function GrantDelete({ grantId }: { grantId: string }) {
  const router = useRouter();
  const remove = api.grant.delete.useMutation({
    onSuccess: () => router.push(`/grants`),
  });
  return (
    <Button
      isLoading={remove.isLoading}
      variant="danger"
      onClick={() => {
        if (window.confirm("Are you sure you want to delete this grant?")) {
          remove.mutate({ id: grantId });
        }
      }}
    >
      Delete grant
    </Button>
  );
}
