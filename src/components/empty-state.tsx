import { type PropsWithChildren } from "react";

export function EmptyState({
  title,
  children,
}: PropsWithChildren<{ title: string }>) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center rounded border p-8">
      <h3 className="mt-0">{title}</h3>
      <div>{children}</div>
    </div>
  );
}
