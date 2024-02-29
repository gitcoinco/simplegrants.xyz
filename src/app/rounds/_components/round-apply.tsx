"use client";

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
import { cn } from "~/utils/cn";
import { Badge } from "~/components/ui/badge";

export function RoundApply({ roundId }: { roundId: string }) {
  const grants = api.session.grants.useQuery();
  const applications = api.session.applications.useQuery({ roundId });

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
              {grants.data?.map((grant) => {
                const hasApplied = Boolean(
                  applications.data?.find((appl) => appl.grantId === grant.id),
                );
                return (
                  <GrantRadio
                    key={grant.id}
                    hasApplied={hasApplied}
                    value={grant.id}
                    label={grant.name}
                  />
                );
              })}
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

function GrantRadio({ label = "", value = "", hasApplied = false }) {
  const { register } = useFormContext<TApplicationCreate>();

  return (
    <Label
      className={cn(
        "flex cursor-pointer items-center justify-between p-4 hover:bg-gray-100",
        { ["opacity-50"]: hasApplied },
      )}
    >
      <div className="flex items-center gap-2">
        <Radio value={value} disabled={hasApplied} {...register("grantId")} />
        {label}
      </div>
      {hasApplied && <Badge>Already applied</Badge>}
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
