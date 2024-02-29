"use client";

import { XIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { type ReactNode } from "react";
import { useFormContext, type SubmitHandler } from "react-hook-form";
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
import { formatMoney } from "~/utils/formatMoney";

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
  return (
    <Form
      schema={ZDonateInputSchema}
      defaultValues={defaultValues}
      onSubmit={onSubmit}
    >
      <div className="gap-2 sm:flex">
        <CheckoutFormContent />
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
      <div className="py-8 text-center text-gray-600">
        Matching calculations might be slow
      </div>
    </Form>
  );
}

function CheckoutFormContent() {
  const cart = useCart();
  const { watch } = useFormContext<TDonateInputSchema>();

  const checkoutGrants = watch("grants");
  const contributions = api.contribution.get.useQuery({
    checkoutGrants,
  });

  return (
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
            renderMatching={() => {
              const preCheckoutMatch =
                contributions.data?.matching?.[field.id] ?? 0;
              const postCheckoutMatch =
                contributions.data?.matchingCheckout?.[field.id] ?? 0;

              const matchAmount = postCheckoutMatch - preCheckoutMatch;

              return (
                <div className="flex gap-2 px-4 text-sm">
                  <Skeleton
                    className="h-4 w-16"
                    isLoading={contributions.isLoading}
                  >
                    {matchAmount > 0 ? "+" : ""}
                    {formatMoney(matchAmount, "usd")}
                  </Skeleton>
                  <div>estimated match</div>
                </div>
              );
            }}
          />
        )}
      />
    </div>
  );
}

function CartItem({
  grantId,
  index,
  renderMatching,
  onUpdate,
  onRemove,
}: {
  grantId: string;
  renderMatching: () => ReactNode;
  index: number;
  onUpdate: (amount: number) => void;
  onRemove: () => void;
}) {
  const { data: grant, isLoading } = api.grant.get.useQuery({ id: grantId });

  return (
    <div
      className={cn("relative flex gap-2 rounded border", {
        ["animate-pulse"]: isLoading,
      })}
    >
      <div className="relative aspect-video w-48 bg-gray-200">
        {grant && (
          <Image
            alt={grant.name}
            src={grant.image}
            sizes="500px"
            fill
            style={{ objectFit: "cover" }}
          />
        )}
      </div>
      <div className="flex-1 p-2">
        <div className="mb-4 flex justify-between">
          <Skeleton isLoading={!grant} className="min-h-6 min-w-48">
            <Link tabIndex={-1} href={`/grants/${grantId}`}>
              <h3 className="text-xl font-semibold">{grant?.name}</h3>
            </Link>
          </Skeleton>
        </div>
        <div className="flex items-center justify-between">
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
          {renderMatching()}
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
