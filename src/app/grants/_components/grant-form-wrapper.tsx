"use client";

import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import type { Grant } from "@prisma/client";

import { GrantForm } from "./grant-form";
import { useFileUpload } from "~/hooks/useFileUpload";
import { type TGrantUpdateInputSchema } from "~/server/api/routers/grant/grant.schemas";

export default function GrantFormWrapper({ grant }: { grant?: Grant }) {
  const router = useRouter();
  const upload = useFileUpload();

  const onSuccess = async (data: Grant) => {
    router.push(`/grants/${data.id}`);
    router.refresh();
  };

  const create = api.grant.create.useMutation({ onSuccess });
  const update = api.grant.update.useMutation({ onSuccess });

  const isLoading = create.isLoading || update.isLoading;

  const error = create.error?.message ?? update.error?.message;

  const defaultValues = {
    ...grant,
  } as TGrantUpdateInputSchema;
  return (
    <div className="">
      <GrantForm
        isLoading={isLoading}
        upload={upload}
        defaultValues={defaultValues}
        onSubmit={(data) => {
          if (grant) {
            update.mutate({ id: grant.id, data });
          } else {
            create.mutate(data);
          }
        }}
      />
      <div className="text-red-600">{error}</div>
    </div>
  );
}
