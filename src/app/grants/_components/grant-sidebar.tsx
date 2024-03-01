"use client";
import { api } from "~/trpc/react";
import { type PropsWithChildren } from "react";
import { formatMoney } from "~/utils/formatMoney";
import { AddToCartButton } from "~/app/checkout/_components/add-to-cart";
import { A } from "~/components/ui/a";

export function GrantSidebar({ id }: { id: string }) {
  const funding = api.grant.funding.useQuery({ ids: [id] });
  const funders = api.grant.funders.useQuery({ ids: [id] });
  const rounds = api.grant.rounds.useQuery({ ids: [id] });
  console.log(rounds.data);
  return (
    <div className=" sm:p-4 md:w-96">
      <div className="mb-8 space-y-8">
        <Stat title="raised">
          {formatMoney(funding.data?.amount ?? 0, "usd")}
        </Stat>
        <Stat title="funders">{funders.data?.length}</Stat>
        <AddToCartButton grantId={id} />
        <div>
          <h3 className="text-lg font-semibold">In rounds</h3>
          {rounds.data?.map((round) => (
            <A
              key={round.id}
              href={`/rounds/${round.id}`}
              className="block truncate"
            >
              {round.name}
            </A>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <div className="text-gray-600">
      <div className="text-4xl font-bold">{children}</div>
      <h3 className="text-sm">{title}</h3>
    </div>
  );
}
