"use client";

import { dateToInputDate } from "~/components/ui/form";
import { RoundForm } from "./round-form";
import { useMutation } from "@tanstack/react-query";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

function useFileUpload() {
  return useMutation(async (file: File) => {
    console.log("uploading file", file);
    return { url: "https://file-upload" };
  });
}

const ONE_DAY = 1000 * 60 * 60 * 24;
const ONE_MONTH = ONE_DAY * 30;
export default function CreateRoundForm() {
  const router = useRouter();
  const upload = useFileUpload();

  const create = api.round.create.useMutation();
  return (
    <RoundForm
      buttonText="Create round"
      defaultValues={{
        startsAt: dateToInputDate(new Date()),
        endsAt: dateToInputDate(new Date(Date.now() + ONE_MONTH)),
      }}
      upload={upload}
      onSubmit={(round) =>
        create.mutate(round, {
          onSuccess(round) {
            console.log("round created", round);
            router.push(`/rounds/${round.id}`);
          },
        })
      }
    />
  );
}
