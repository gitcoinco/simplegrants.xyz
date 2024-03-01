"use client";

import { XIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useCallback, type ReactNode, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useLocalStorage } from "react-use";
import { CurrencyInput } from "~/components/currency-input";

import { Button } from "~/components/ui/button";
import { FieldArray } from "~/components/ui/form/field-array";
import { Fieldset } from "~/components/ui/form/fieldset";
import { Skeleton } from "~/components/ui/skeleton";
import { type TDonateInputSchema } from "~/server/api/routers/grant/grant.schemas";
import { api } from "~/trpc/react";
import { cn } from "~/utils/cn";
import { formatMoney } from "~/utils/formatMoney";
import { useCart } from "../hooks/useCart";

type Props = {
  isLoading?: boolean;
};

function Checkout({ isLoading }: Props) {
  const cart = useCart();
  const { watch } = useFormContext<TDonateInputSchema>();

  const checkoutGrants = watch("grants");

  const contributions = api.contribution.get.useQuery({
    checkoutGrants,
  });

  const calculateMatch = useCallback(
    (grantId: string) => {
      const preCheckoutMatch = contributions.data?.matching?.[grantId] ?? 0;
      const postCheckoutMatch =
        contributions.data?.matchingCheckout?.[grantId] ?? 0;

      return postCheckoutMatch - preCheckoutMatch;
    },
    [contributions.data],
  );

  const totalMatch = useMemo(
    () => checkoutGrants.reduce((sum, x) => sum + calculateMatch(x.id), 0),
    [checkoutGrants, calculateMatch],
  );

  const totalDonation = checkoutGrants.reduce(
    (sum, x) => sum + x.amount * 100,
    0,
  );

  return (
    <div className="gap-2 space-y-2 md:flex md:space-y-0">
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
                const matchAmount = calculateMatch(field.id);

                return (
                  <div
                    className={cn(
                      "flex flex-wrap items-end justify-end text-sm",
                      {
                        ["opacity-50"]: contributions.isLoading,
                      },
                    )}
                  >
                    <div className="pr-1">
                      {matchAmount > 0 ? "+" : ""}
                      {formatMoney(matchAmount, "usd")}
                    </div>
                    <div className="text-xs">estimated match</div>
                  </div>
                );
              }}
            />
          )}
        />
      </div>
      <div className="flex flex-col justify-between border p-2 md:w-96">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Summary</h3>
            <div className="flex justify-between">
              <div>Estimated total match</div>
              <div>{formatMoney(totalMatch, "usd")}</div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Your contributions</h3>

            {checkoutGrants.map((grant) => (
              <SummaryContributionGrant
                key={grant.id}
                id={grant.id}
                amount={checkoutGrants.find((g) => g.id === grant.id)?.amount}
              />
            ))}
          </div>
          <div className="">
            <h3 className="text-lg font-semibold">Your total contribution</h3>
            <div className="pb-4 text-center text-xl font-semibold text-green-800">
              {formatMoney(totalDonation + totalMatch, "usd")}
            </div>
          </div>
        </div>
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
  );
}

function SummaryContributionGrant({ id = "", amount = 0 }) {
  const { data: grant } = api.grant.get.useQuery({ id });
  return (
    <div className="flex justify-between">
      <div>{grant?.name}</div>
      <div>{formatMoney(amount * 100, "usd")}</div>
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
      <div className="relative aspect-video bg-gray-200 sm:w-48">
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
        <div className="items-center justify-between md:flex">
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
          rounded="full"
          onClick={onRemove}
          className="absolute right-1 top-1"
        />
      </div>
    </div>
  );
}

export const CheckoutForm = dynamic(async () => Checkout, { ssr: false });
