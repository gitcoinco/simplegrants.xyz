"use client";
import Link from "next/link";
import type { ComponentProps } from "react";
import { tv } from "tailwind-variants";
import { createComponent } from "~/components/ui";
import { cn } from "~/utils/cn";

export const Tabs = createComponent("div", tv({ base: "flex gap-4" }));

export function Tab({
  isActive,
  ...props
}: { isActive: boolean } & ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn("text-xl font-semibold underline-offset-4", {
        ["underline"]: isActive,
      })}
      {...props}
    />
  );
}
