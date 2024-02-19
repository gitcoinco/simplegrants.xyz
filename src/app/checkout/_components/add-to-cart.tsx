"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";
import { useCart } from "./checkout-form";
import { ShoppingCart } from "lucide-react";

function AddToCart({ grantId = "" }) {
  const router = useRouter();
  const cart = useCart();
  if (cart.inCart(grantId))
    return (
      <Button icon={ShoppingCart} as={Link} href={"/checkout"}>
        Already in cart
      </Button>
    );

  return (
    <Button
      icon={ShoppingCart}
      variant="primary"
      onClick={() => {
        cart.set(grantId);
        router.replace("/checkout");
      }}
    >
      Add to cart
    </Button>
  );
}

export const AddToCartButton = dynamic(async () => AddToCart, { ssr: false });
