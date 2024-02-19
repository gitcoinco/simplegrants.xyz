"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";
import { useCart } from "./checkout-form";

function AddToCart({ grantId = "" }) {
  const router = useRouter();
  const cart = useCart();
  if (cart.inCart(grantId))
    return (
      <Button as={Link} href={"/checkout"}>
        View cart
      </Button>
    );

  return (
    <Button
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
