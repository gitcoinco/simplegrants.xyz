"use client";
import type { Round } from "@prisma/client";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { Form } from "~/components/ui/form";
import { Fieldset } from "~/components/ui/form/fieldset";
import { Input } from "~/components/ui/form/inputs";
import { Button } from "~/components/ui/button";
import { ZRoundFundInputSchema } from "~/server/api/routers/round/round.schemas";

export function RoundFundForm({ round }: { round: Round }) {
  const router = useRouter();
  const fund = api.round.fund.useMutation({
    onSuccess: ({ url }) => url && router.push(url),
  });
  return (
    <div>
      <Form
        className="mx-auto flex max-w-sm flex-col gap-2"
        defaultValues={{
          id: round.id,
          amount: 10_000,
          successUrl: `/rounds/${round.id}`,
        }}
        schema={ZRoundFundInputSchema}
        onSubmit={(values) => {
          fund.mutate(values);
        }}
      >
        <h3 className="text-xl font-semibold">Fund Round</h3>
        <div className="gap-2 sm:flex">
          <Fieldset
            className="flex-1"
            name="amount"
            label="Amount"
            setValueAs={(v) => Number(v)}
          >
            <Input type="number" />
          </Fieldset>
          <Fieldset className={"max-w-24"} name="currency" label="Currency">
            <div className="px-4 py-2 uppercase">{round.currency}</div>
          </Fieldset>
        </div>
        <Button isLoading={fund.isLoading} variant="primary" type="submit">
          Fund round
        </Button>
      </Form>
    </div>
  );
}
