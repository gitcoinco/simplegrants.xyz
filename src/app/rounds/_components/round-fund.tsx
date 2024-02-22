"use client";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { Form } from "~/components/ui/form";
import { Fieldset } from "~/components/ui/form/fieldset";
import { Input } from "~/components/ui/form/inputs";
import { Button } from "~/components/ui/button";
import { ZRoundFundInputSchema } from "~/server/api/routers/round/round.schemas";

export function RoundFundForm({ roundId }: { roundId: string }) {
  const router = useRouter();
  const fund = api.round.fund.useMutation({
    onSuccess: ({ url }) => url && router.push(url),
  });
  return (
    <div>
      <Form
        className="mx-auto flex max-w-screen-sm flex-col gap-2"
        defaultValues={{
          id: roundId,
          amount: 10_000,
          currency: "usd",
          successUrl: `/rounds/${roundId}`,
        }}
        schema={ZRoundFundInputSchema}
        onSubmit={(values) => {
          fund.mutate(values);
        }}
      >
        <h3 className="text-xl font-semibold">Fund Round</h3>
        <Fieldset name="amount" label="Amount" setValueAs={(v) => Number(v)}>
          <Input type="number" />
        </Fieldset>
        <Fieldset name="currency" label="Currency">
          <Input />
        </Fieldset>
        <Button isLoading={fund.isLoading} variant="primary" type="submit">
          Fund round
        </Button>
      </Form>
    </div>
  );
}
