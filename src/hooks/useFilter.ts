import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";
import { useState } from "react";
import { useDebounce } from "react-use";

enum SortBy {
  name = "name",
  createdAt = "createdAt",
}
enum SortOrder {
  asc = "asc",
  desc = "desc",
}

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

export function useDebouncedFilter() {
  const { setFilter: _, ...filter } = useFilter();
  const [debouncedFilter, setDebouncedFilter] = useState(filter);

  useDebounce(() => setDebouncedFilter(filter), 300, [filter]);

  return debouncedFilter;
}
