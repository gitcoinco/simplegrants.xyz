"use client";

import { SearchInput, Select } from "~/components/ui/form/inputs";
import { useFilter } from "~/hooks/useFilter";
import type {
  SortBy,
  SortOrder,
} from "~/server/api/routers/round/round.schemas";
import { Label } from "./ui/form/label";

type SortOption = {
  value: string;
  label: string;
};

export function SearchWithFilter({
  searchPlaceholder = "",
  sortOptions,
}: {
  searchPlaceholder: string;
  sortOptions: SortOption[];
}) {
  const { search, sortBy, order, setFilter } = useFilter();
  return (
    <div className="mb-8 items-end gap-2 space-y-2 sm:flex">
      <div className="flex-1">
        <SearchInput
          value={search}
          onChange={(e) => setFilter({ search: e.target.value })}
          placeholder={searchPlaceholder}
        />
      </div>

      <div>
        <Label className="text-xs font-medium uppercase tracking-wider">
          Sort by
        </Label>
        <Select
          className={"w-full sm:w-auto"}
          value={sortBy}
          onChange={(e) => setFilter({ sortBy: e.target.value as SortBy })}
        >
          {sortOptions.map(({ label, value }) => (
            <option className="p-2" key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <Label className="text-xs font-medium uppercase tracking-wider">
          Order
        </Label>
        <Select
          className={"w-full sm:w-auto"}
          value={order}
          onChange={(e) => setFilter({ order: e.target.value as SortOrder })}
        >
          <option value="asc">↓ Ascending</option>
          <option value="desc">↑ Descending</option>
        </Select>
      </div>
    </div>
  );
}
