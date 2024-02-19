import type { ReactNode } from "react";
import {
  useFieldArray,
  useFormContext,
  type UseFieldArrayRemove,
} from "react-hook-form";

export function FieldArray<T>({
  renderItem,
  name,
}: {
  renderItem: (
    field: T,
    { remove }: { remove: UseFieldArrayRemove },
    i: number,
  ) => ReactNode;
  name: string;
}) {
  const { control } = useFormContext();
  const { fields, remove } = useFieldArray({
    control,
    name,
    keyName: "key",
  });
  return <>{fields.map((field, i) => renderItem(field as T, { remove }, i))}</>;
}
