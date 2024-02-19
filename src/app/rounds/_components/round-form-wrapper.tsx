"use client";

import { type Round } from "@prisma/client";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

import { RoundForm } from "./round-form";
import { useFileUpload } from "~/hooks/useFileUpload";
import type { TRoundUpdateInputSchema } from "~/server/api/routers/round/round.schemas";
import { dateToInputDate } from "~/components/ui/form";

export default function RoundFormWrapper({ round }: { round?: Round }) {
  const router = useRouter();
  const upload = useFileUpload();

  const utils = api.useUtils();
  const onSuccess = async (data: Round) => {
    await utils.round.get.invalidate({ id: data.id });
    router.push(`/rounds/${data.id}`);
  };

  const create = api.round.create.useMutation({ onSuccess });
  const update = api.round.update.useMutation({ onSuccess });

  const isLoading = create.isLoading || update.isLoading;
  const error = create.error?.message ?? update.error?.message;

  const defaultValues = {
    ...round,
    startsAt: dateToInputDate(round?.startsAt ?? new Date()),
    endsAt: dateToInputDate(round?.endsAt),
  } as TRoundUpdateInputSchema;

  return (
    <div>
      <RoundForm
        isLoading={isLoading}
        upload={upload}
        defaultValues={defaultValues}
        onSubmit={(data) => {
          if (round) {
            update.mutate({ id: round.id, data });
          } else {
            create.mutate(data);
          }
        }}
      />

      <div className="text-red-600">{error}</div>
    </div>
  );
}
