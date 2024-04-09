"use client";

import { useFilter } from "~/hooks/useFilter";
import { DiscoverGrants } from "./discover-grants";

export function SearchGrants() {
  const filter = useFilter();
  return <DiscoverGrants {...filter} />;
}
