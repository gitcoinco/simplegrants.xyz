"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

const stripeParams = {
  response_type: "code",
  client_id: process.env.NEXT_PUBLIC_CLIENT_ID!,
  scope: "read_write",
  redirect_uri: `${`http://localhost:3000/profile/verify`}`,
};

const connectStripeLink = `https://connect.stripe.com/oauth/authorize?${new URLSearchParams(stripeParams).toString()}`;

export function ConnectStripe({ stripeAccount }: { stripeAccount?: unknown }) {
  const router = useRouter();

  const disconnect = api.stripe.disconnectAccount.useMutation({
    onSuccess: () => router.refresh(),
  });

  if (stripeAccount) {
    return (
      <div className="flex items-center gap-2">
        <pre>{String(stripeAccount)}</pre>
        <Button
          icon={X}
          variant="ghost"
          isLoading={disconnect.isLoading}
          onClick={() => disconnect.mutate()}
        ></Button>
      </div>
    );
  }

  return (
    <Button as={Link} href={connectStripeLink}>
      Connect Stripe
    </Button>
  );
}
