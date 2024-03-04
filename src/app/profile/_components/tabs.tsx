"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { tv } from "tailwind-variants";
import { createComponent } from "~/components/ui";
import { cn } from "~/utils/cn";

const tabs = [
  {
    href: "/profile",
    children: "Donations",
  },
  {
    href: "/profile/grants",
    children: "Grants",
  },
];
export function ProfileTabs() {
  const path = usePathname();

  return (
    <Tabs className="mb-4">
      {tabs.map((tab) => (
        <Tab key={tab.href} isActive={path === tab.href} {...tab} />
      ))}
    </Tabs>
  );
}

const Tabs = createComponent("div", tv({ base: "flex gap-4" }));

function Tab({
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
