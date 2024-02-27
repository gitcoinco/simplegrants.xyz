import NextLink from "next/link";
import { type ComponentProps } from "react";

export function A(props: ComponentProps<typeof NextLink>) {
  return (
    <NextLink
      className="underline underline-offset-2 hover:text-gray-700"
      {...props}
    />
  );
}
