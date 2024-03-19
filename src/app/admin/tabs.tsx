"use client";
import { usePathname } from "next/navigation";
import { Tab, Tabs } from "~/components/ui/tabs";

const tabs = [
  {
    href: "/admin",
    children: "Rounds",
  },
  {
    href: "/admin/grants",
    children: "Grants",
  },
];
export function AdminTabs() {
  const path = usePathname();

  return (
    <Tabs className="mb-4">
      {tabs.map((tab) => (
        <Tab key={tab.href} isActive={path === tab.href} {...tab} />
      ))}
    </Tabs>
  );
}
