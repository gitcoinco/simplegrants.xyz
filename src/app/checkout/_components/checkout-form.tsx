"use client";

import { XIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { type SubmitHandler } from "react-hook-form";
import { useLocalStorage } from "react-use";
import { CurrencyInput } from "~/components/currency-input";

import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { FieldArray } from "~/components/ui/form/field-array";
import { Fieldset } from "~/components/ui/form/fieldset";
import { Skeleton } from "~/components/ui/skeleton";
import {
  ZDonateInputSchema,
  type TDonateInputSchema,
} from "~/server/api/routers/grant/grant.schemas";
import { api } from "~/trpc/react";
import { cn } from "~/utils/cn";

type Cart = Record<string, number>;

export function useCart() {
  const [state = {}, store] = useLocalStorage<Cart>("cart", {});

  return {
    state,
    set: (id: string, amount = 0) => store({ ...state, [id]: amount }),
    remove: (id: string) => {
      /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
      const { [id]: exists, ...rest } = state ?? {};
      store(rest);
    },
    reset: () => store({}),
    inCart: (id: string) => Number.isSafeInteger(state[id]),
  };
}

type Props = {
  isLoading?: boolean;
  onSubmit: SubmitHandler<TDonateInputSchema>;
  defaultValues?: TDonateInputSchema;
};

function Checkout({ defaultValues, isLoading, onSubmit }: Props) {
  const cart = useCart();

  return (
    <Form
      schema={ZDonateInputSchema}
      defaultValues={defaultValues}
      onSubmit={onSubmit}
    >
      <div className="gap-2 sm:flex">
        <div className="flex-1 space-y-2">
          <FieldArray
            name="grants"
            renderItem={(field: { id: string; key: string }, { remove }, i) => (
              <CartItem
                key={field.id}
                grantId={field.id}
                index={i}
                onUpdate={(amount) => cart.set(field.id, amount)}
                onRemove={() => {
                  remove(i);
                  cart.remove(field.id);
                }}
              />
            )}
          />
        </div>

        <div className="flex flex-col justify-between border p-2 sm:w-96">
          <Button
            isLoading={isLoading}
            variant="primary"
            type="submit"
            className="w-full"
          >
            Checkout
          </Button>
        </div>
      </div>
    </Form>
  );
}

function CartItem({
  grantId,
  index,
  onUpdate,
  onRemove,
}: {
  grantId: string;
  index: number;
  onUpdate: (amount: number) => void;
  onRemove: () => void;
}) {
  const { data, isLoading } = api.grant.get.useQuery({ id: grantId });

  return (
    <div
      className={cn("relative flex gap-2 rounded border", {
        ["animate-pulse"]: isLoading,
      })}
    >
      <div className="relative aspect-video w-48 bg-gray-200">
        {data && (
          <Image
            alt={data.name}
            src={data.image}
            sizes="500px"
            fill
            style={{ objectFit: "cover" }}
          />
        )}
      </div>
      <div className="p-2">
        <div className="mb-4">
          <Skeleton isLoading={!data} className="min-h-6 min-w-48">
            <Link tabIndex={-1} href={`/grants/${grantId}`}>
              <h3 className="text-xl font-semibold">{data?.name}</h3>
            </Link>
          </Skeleton>
        </div>
        <div>
          <Fieldset
            name={`grants.${index}.amount`}
            onBlur={(value) => {
              console.log("onBlur", value);
              onUpdate(Number(value));
            }}
          >
            <CurrencyInput currency="$" />
          </Fieldset>
        </div>
        <Button
          icon={XIcon}
          tabIndex={-1}
          variant="ghost"
          onClick={onRemove}
          className="absolute right-0 top-0"
        />
      </div>
    </div>
  );
}

export const CheckoutForm = dynamic(async () => Checkout, { ssr: false });
