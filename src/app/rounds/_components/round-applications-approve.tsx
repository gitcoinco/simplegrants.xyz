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
import { cn } from "~/utils/cn";
import { Badge } from "~/components/ui/badge";

export function RoundApplicationsApprove({
  roundId,
  applications,
}: {
  roundId: string;
  applications: (Application & { grant: Grant })[];
}) {
  const router = useRouter();
  const approve = api.application.approve.useMutation({
    onSuccess: () => router.refresh(),
  });

  return (
    <div>
      <Form
        className="mx-auto flex max-w-screen-sm flex-col gap-2"
        defaultValues={{
          roundId,
          applicationIds: [],
        }}
        schema={ZApplicationApproveSchema}
        onSubmit={(values) => {
          approve.mutate(values);
        }}
      >
        <h3 className="text-xl font-semibold">Approve Grants</h3>
        <input type="hidden" value={roundId} name="roundId" />
        <div className="mb-2 max-h-52 divide-y overflow-auto rounded border">
          {applications.map((application) => (
            <ApplicationCheckbox key={application.id} {...application} />
          ))}
        </div>

        <div className="flex justify-end">
          <ApproveButton isLoading={approve.isLoading} />
        </div>
        <pre className="text-red-600">{approve.error?.message}</pre>
      </Form>
    </div>
  );
}

function ApplicationCheckbox({
  id,
  approvedById,
  grant,
}: Application & { grant: Grant }) {
  const { register } = useFormContext<TApplicationApprove>();
  return (
    <Label
      className={cn("flex items-center justify-between p-4", {
        ["cursor-pointer hover:bg-gray-50 "]: !approvedById,
      })}
    >
      <div className="flex h-12 items-center gap-2 text-lg font-medium">
        <Checkbox
          value={id}
          className={cn({ ["invisible"]: approvedById })}
          {...register("applicationIds")}
          disabled={Boolean(approvedById)}
        />
        {grant.name}
      </div>
      {approvedById ? (
        <Badge variant="success">Approved</Badge>
      ) : (
        <Button as={Link} href={`/grants/${grant.id}/review`} target="_blank">
          Review
        </Button>
      )}
    </Label>
  );
}
function ApproveButton({ isLoading = false }) {
  const selected =
    useFormContext<TApplicationApprove>().watch("applicationIds")?.length || 0;

  return (
    <Button
      icon={CheckCheck}
      isLoading={isLoading}
      type="submit"
      variant="primary"
      disabled={!selected || isLoading}
    >
      Approve {selected} grants
    </Button>
  );
}
