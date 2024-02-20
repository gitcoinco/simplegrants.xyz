"use client";

import type { Application, Grant } from "@prisma/client";

import { Checkbox } from "~/components/ui/form/inputs";
import { Label } from "~/components/ui/form/label";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { useFormContext } from "react-hook-form";
import {
  type TApplicationApprove,
  ZApplicationApproveSchema,
} from "~/server/api/routers/application/application.schemas";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCheck } from "lucide-react";

export function RoundApplicationsApprove({
  roundId,
  applications,
}: {
  roundId: string;
  applications: (Application & { grant: Grant })[];
}) {
  const apply = api.application.create.useMutation();
  const router = useRouter();

  return (
    <div>
      <Form
        defaultValues={{ roundId, applicationIds: [] }}
        schema={ZApplicationApproveSchema}
        onSubmit={(values) => {
          console.log("approve", values);
          // apply.mutate(values, { onSuccess: () => handleClose() });
        }}
      >
        <input type="hidden" value={roundId} name="roundId" />
        <div className="mb-2 max-h-52 divide-y overflow-auto rounded border">
          {applications.map((application) => (
            <ApplicationCheckbox
              key={application.id}
              value={application.id}
              grant={application.grant}
            />
          ))}
        </div>

        <div className="flex justify-end">
          <ApproveButton isLoading={apply.isLoading} />
        </div>
        <pre className="text-red-600">{apply.error?.message}</pre>
      </Form>
    </div>
  );
}

function ApplicationCheckbox({
  grant,
  value,
}: {
  grant: Grant;
  value: string;
}) {
  const { register } = useFormContext<TApplicationApprove>();

  return (
    <Label className="flex cursor-pointer items-center justify-between p-4 hover:bg-gray-100">
      <div className="flex items-center gap-2">
        <Checkbox value={value} {...register("applicationIds")} />
        {grant.name}
      </div>
      <Button as={Link} href={`/grants/${grant.id}/review`} target="_blank">
        Review
      </Button>
    </Label>
  );
}
function ApproveButton({ isLoading = false }) {
  const selected =
    useFormContext<TApplicationApprove>().watch("applicationIds");

  return (
    <Button
      icon={CheckCheck}
      isLoading={isLoading}
      type="submit"
      variant="primary"
      disabled={!selected.length || isLoading}
    >
      Approve {selected.length} grants
    </Button>
  );
}
