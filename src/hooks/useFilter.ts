"use client";

import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";
import { SortBy, SortOrder } from "~/server/api/routers/round/round.schemas";

export function useFilter() {
  const [filter, setFilter] = useQueryStates(
    {
      search: parseAsString.withDefault(""),
      sortBy: parseAsStringEnum<SortBy>(Object.values(SortBy)).withDefault(
        SortBy.createdAt,
      ),
      order: parseAsStringEnum<SortOrder>(Object.values(SortOrder)).withDefault(
        SortOrder.asc,
      ),
    },
    { history: "replace" },
  );

  return { ...filter, setFilter };
}
