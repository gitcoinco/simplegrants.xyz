"use client";
import { type ReactNode } from "react";
import { type UseTRPCQueryResult } from "@trpc/react-query/shared";
import { EmptyState } from "~/components/empty-state";
import { cn } from "~/utils/cn";
import { Alert } from "./ui/alert";
import { XCircleIcon } from "lucide-react";

const columnMap = {
  2: "grid-cols-1 md:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
} as const;

type Props<T> = UseTRPCQueryResult<T[], unknown> & {
  columns?: keyof typeof columnMap;
  limit?: number;
  renderItem: (item: T, opts: { isLoading: boolean }) => ReactNode;
};
export function LoadingGrid<T>({
  data,
  error,
  columns = 3,
  limit = 6,
  isLoading,
  renderItem,
}: Props<T>) {
  return (
    <>
      {error ? (
        <Alert icon={XCircleIcon} title="Network error" variant="error">
          {(error as Error).message}
        </Alert>
      ) : !isLoading && !data?.length ? (
        <EmptyState title="No results found" />
      ) : (
        <div className={cn("grid gap-2", columnMap[columns])}>
          {(
            data ?? Array.from({ length: limit }).map((_, id) => ({ id }) as T)
          )?.map((item) => renderItem(item, { isLoading }))}
        </div>
      )}
    </>
  );
}
