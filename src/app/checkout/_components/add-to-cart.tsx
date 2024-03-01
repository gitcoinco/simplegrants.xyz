"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";

import { Button } from "~/components/ui/button";
import { useCart } from "../hooks/useCart";

function AddToCart({ grantId = "" }) {
  const router = useRouter();
  const cart = useCart();
  if (cart.inCart(grantId))
    return (
      <Button
        className="w-full"
        icon={ShoppingCart}
        as={Link}
        href={"/checkout"}
      >
        Already in cart
      </Button>
    );

  return (
    <Button
      variant="primary"
      className="w-full"
      icon={ShoppingCart}
      onClick={() => {
        cart.set(grantId);
        router.push("/checkout");
      }}
    >
      Donate <span className="hidden pl-1 sm:inline"> to this project</span>
    </Button>
  );
}

export const AddToCartButton = dynamic(async () => AddToCart, { ssr: false });
