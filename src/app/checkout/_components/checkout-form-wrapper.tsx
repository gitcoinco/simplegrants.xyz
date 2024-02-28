"use client";

import { api } from "~/trpc/react";
import { useRouter, useSearchParams } from "next/navigation";

import { CheckoutForm, useCart } from "./checkout-form";
import { useEffect } from "react";
import { Alert } from "~/components/ui/alert";

export default function CheckoutFormWrapper() {
  const router = useRouter();
  const params = useSearchParams();
  const cart = useCart();

  const donate = api.grant.donate.useMutation({
    onSuccess: ({ url = "" }) => router.push(url!),
  });

  useEffect(() => {
    if (params.get("session_id") && Object.keys(cart.state).length) {
      cart.reset();
    }
  }, [params, cart, router]);

  const error = donate.error?.message;

  const defaultValues = {
    successUrl: "checkout",
    grants: Object.entries(cart.state).map(([id, amount]) => ({
      id,
      amount,
    })),
  };
  if (params.get("session_id")) {
    return (
      <div className="flex items-center justify-center bg-gray-100 p-16 text-lg font-semibold">
        Thank your for your donation!
      </div>
    );
  }
  return (
    <div className="">
      <CheckoutForm
        isLoading={donate.isLoading}
        defaultValues={defaultValues}
        onSubmit={(data) => {
          donate.mutate(data);
        }}
      />
      <pre className="text-red-600">{error}</pre>
    </div>
  );
}
