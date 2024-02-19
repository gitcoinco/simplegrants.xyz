"use client";

import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

import { CheckoutForm, useCart } from "./checkout-form";

export default function CheckoutFormWrapper() {
  const router = useRouter();
  const cart = useCart();

  const donate = api.grant.donate.useMutation({
    onSuccess: ({ url = "" }) => router.push(url!),
  });

  const error = donate.error?.message;

  const defaultValues = {
    successUrl: "http://localhost:3000/checkout?status=success",
    grants: Object.entries(cart.state).map(([id, amount]) => ({
      id,
      amount,
    })),
  };
  return (
    <div className="">
      <CheckoutForm
        isLoading={donate.isLoading}
        defaultValues={defaultValues}
        onSubmit={(data) => {
          console.log("donate", data);
          donate.mutate(data);
        }}
      />
      <pre className="text-red-600">{error}</pre>
    </div>
  );
}
