"use client";

import { SearchInput, Select } from "~/components/ui/form/inputs";
import { useFilter } from "~/hooks/useFilter";

export function SearchWithFilter() {
  const { search, sortBy, order, setFilter } = useFilter();
  return (
    <div className="mb-8 flex gap-2">
      <SearchInput
        value={search}
        onChange={(e) => setFilter({ search: e.target.value })}
        placeholder="Search rounds..."
      />

      <Select
        value={sortBy}
        onChange={(e) => setFilter({ sortBy: e.target.value })}
      >
        <optgroup label="Sort by">
          <option value="name">Name</option>
          <option value="createdAt">Created date</option>
        </optgroup>
      </Select>
      <Select
        value={order}
        onChange={(e) => setFilter({ order: e.target.value })}
      >
        <optgroup label="Order">
          <option value="asc">↓ Ascending</option>
          <option value="desc">↑ Descending</option>
        </optgroup>
      </Select>
    </div>
  );
}
