"use client";

import type { Grant } from "@prisma/client";
import { Drawer } from "vaul";

import { Radio } from "~/components/ui/form/inputs";
import { Label } from "~/components/ui/form/label";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { useFormContext } from "react-hook-form";
import {
  type TApplicationCreate,
  ZApplicationCreateSchema,
} from "~/server/api/routers/application/application.schemas";
import { api } from "~/trpc/react";
import { useRouter, useSearchParams } from "next/navigation";

export function RoundApply({ roundId }: { roundId: string }) {
  const grants = api.session.grants.useQuery();
  const apply = api.application.create.useMutation();
  const router = useRouter();
  const action = useSearchParams().get("action");

  function handleClose() {
    router.replace(`/rounds/${roundId}`);
  }
  if (grants.isLoading) return null;
  return (
    <Drawer.Root
      open={action === "apply"}
      dismissible
      onClose={console.log}
      onOpenChange={(isOpen) => !isOpen && handleClose()}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 mt-24 flex flex-col rounded-t bg-gray-100 p-4">
          <div className="mb-2">
            <h3>Select one of your grants to apply with</h3>
          </div>
          <Form
            defaultValues={{ roundId }}
            schema={ZApplicationCreateSchema}
            onSubmit={(values) => {
              apply.mutate(values, { onSuccess: () => handleClose() });
            }}
          >
            <input type="hidden" value={roundId} name="roundId" />
            <div className="mb-2 max-h-52 divide-y overflow-auto rounded border">
              {grants.data?.map((grant) => (
                <GrantRadio
                  key={grant.id}
                  value={grant.id}
                  label={grant.name}
                />
              ))}
            </div>
            <div className="flex justify-end">
              <ApplyButton isLoading={apply.isLoading} />
            </div>

            <pre className="text-red-600">{apply.error?.message}</pre>
          </Form>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

function GrantRadio({ label = "", value = "" }) {
  const { register } = useFormContext<TApplicationCreate>();

  return (
    <Label className="flex cursor-pointer items-center gap-2 p-4 hover:bg-gray-100">
      <Radio value={value} {...register("grantId")} />
      {label}
    </Label>
  );
}
function ApplyButton({ isLoading = false }) {
  const selected = useFormContext<TApplicationCreate>().watch("grantId");

  return (
    <Button
      isLoading={isLoading}
      type="submit"
      variant="primary"
      disabled={!selected || isLoading}
    >
      Apply to round
    </Button>
  );
}
