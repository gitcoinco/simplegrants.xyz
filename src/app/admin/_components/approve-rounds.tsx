"use client";
import { type Grant } from "@prisma/client";
import { ApproveForm } from "./approve-form";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export function ApproveRounds({ rounds }: { rounds: Grant[] }) {
  const router = useRouter();
  const approve = api.admin.approveRounds.useMutation({
    onSuccess: () => router.refresh(),
  });
  const remove = api.admin.deleteRounds.useMutation({
    onSuccess: () => router.refresh(),
  });
  return (
    <ApproveForm
      type="rounds"
      isLoading={approve.isLoading}
      items={rounds}
      onSubmit={(values) => approve.mutate(values)}
      onDelete={(values) => remove.mutate(values)}
    />
  );
}
