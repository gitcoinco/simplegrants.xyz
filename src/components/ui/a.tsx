import NextLink from "next/link";
import { type ComponentProps } from "react";
import { cn } from "~/utils/cn";

export function A({ className, ...props }: ComponentProps<typeof NextLink>) {
  return (
    <NextLink
      className={cn(
        "underline underline-offset-2 hover:text-gray-700",
        className,
      )}
      {...props}
    />
  );
}
