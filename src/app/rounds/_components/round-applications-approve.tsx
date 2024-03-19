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
import { Badge } from "~/components/ui/badge";
import { List, ListItem } from "~/components/ui/list";

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
          ids: [],
        }}
        schema={ZApplicationApproveSchema}
        onSubmit={(values) => approve.mutate(values)}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Approve Grants</h3>
          <ApproveButton isLoading={approve.isLoading} />
        </div>
        <input type="hidden" value={roundId} name="roundId" />
        <List>
          {applications.map((item) => (
            <ListItem
              as={Label}
              key={item.id}
              className="cursor-pointer hover:bg-gray-50"
            >
              <div className="flex h-12 items-center gap-2 text-lg font-medium">
                <SelectCheckbox id={item.id} />
                {item.grant.name}
              </div>
              {item.approvedById ? (
                <Badge variant="success">Approved</Badge>
              ) : (
                <Button
                  as={Link}
                  href={`/grants/${item.grant.id}/review`}
                  target="_blank"
                >
                  Review
                </Button>
              )}
            </ListItem>
          ))}
        </List>

        <pre className="text-red-600">{approve.error?.message}</pre>
      </Form>
    </div>
  );
}

function SelectCheckbox({ id = "" }) {
  const { register } = useFormContext();
  return <Checkbox value={id} {...register("ids")} />;
}

function ApproveButton({ isLoading = false }) {
  const selected =
    useFormContext<TApplicationApprove>().watch("ids")?.length || 0;

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
