"use client";
import { type Grant } from "@prisma/client";
import { ApproveForm } from "./approve-form";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export function ApproveGrants({ grants }: { grants: Grant[] }) {
  const router = useRouter();
  const approve = api.admin.approveGrants.useMutation({
    onSuccess: () => router.refresh(),
  });
  const remove = api.admin.deleteGrants.useMutation({
    onSuccess: () => router.refresh(),
  });
  return (
    <ApproveForm
      type="grants"
      isLoading={approve.isLoading}
      items={grants}
      onSubmit={(values) => approve.mutateAsync(values)}
      onDelete={(values) => remove.mutateAsync(values)}
    />
  );
}
