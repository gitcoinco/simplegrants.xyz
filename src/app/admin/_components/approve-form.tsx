"use client";
import { Form, type SubmitHandler } from "~/components/ui/form";
import { List, ListItem } from "~/components/ui/list";
import { useFormContext } from "react-hook-form";
import { ZApproveSchema } from "~/server/api/routers/admin/admin.schemas";
import { Button } from "~/components/ui/button";
import { CheckCheck, Trash2 } from "lucide-react";
import { Label } from "~/components/ui/form/label";
import { Checkbox } from "~/components/ui/form/inputs";
import Link from "next/link";

type GenericItem = { id: string; name: string };

type DeleteHandler = (params: { ids: string[] }) => Promise<unknown>;
export function ApproveForm<T extends GenericItem>({
  isLoading,
  items,
  type,
  onSubmit,
  onDelete,
}: {
  isLoading: boolean;
  items: T[];
  type: "grants" | "rounds";
  onSubmit: SubmitHandler<typeof ZApproveSchema>;
  onDelete: DeleteHandler;
}) {
  return (
    <Form
      defaultValues={{ ids: [] }}
      schema={ZApproveSchema}
      onSubmit={(values, form) => onSubmit(values).then(() => form?.reset())}
      className="mx-auto max-w-screen-sm space-y-2"
    >
      <div className="flex justify-end gap-2">
        <SelectAllButton
          allIds={items.map((i) => i.id)}
          isLoading={isLoading}
        />
        <ApproveButton isLoading={isLoading} />
        <DeleteButton isLoading={isLoading} onDelete={onDelete} />
      </div>
      <List>
        {!isLoading && !items.length && <EmptyState />}
        {items.map((item) => (
          <ListItem
            as={Label}
            key={item.id}
            className="cursor-pointer hover:bg-gray-50"
          >
            <div className="flex h-12 items-center gap-2 text-lg font-medium">
              <SelectCheckbox id={item.id} />
              {item.name}
            </div>
            <Button
              as={Link}
              href={`/${type}/${item.id}/review`}
              target="_blank"
            >
              Review
            </Button>
          </ListItem>
        ))}
      </List>
    </Form>
  );
}

function EmptyState() {
  return (
    <div className="flex justify-center p-6">Everything has been approved</div>
  );
}

function SelectCheckbox({ id = "" }) {
  const { register } = useFormContext();
  return <Checkbox value={id} {...register("ids")} />;
}

function ApproveButton({ isLoading = false }) {
  const selected =
    useFormContext<{ ids: string[] }>().watch("ids")?.length || 0;

  return (
    <Button
      icon={CheckCheck}
      isLoading={isLoading}
      type="submit"
      variant="primary"
      disabled={!selected || isLoading}
    >
      Approve {selected} selected
    </Button>
  );
}

function SelectAllButton({
  allIds,
  isLoading,
}: {
  allIds: string[];
  isLoading: boolean;
}) {
  const { setValue } = useFormContext<{ ids: string[] }>();

  return (
    <Button
      onClick={() => setValue("ids", allIds)}
      icon={CheckCheck}
      disabled={isLoading}
    >
      Select all
    </Button>
  );
}

function DeleteButton({
  isLoading,
  onDelete,
}: {
  isLoading: boolean;
  onDelete: DeleteHandler;
}) {
  const { watch, reset } = useFormContext<{ ids: string[] }>();
  const selected = watch("ids");
  const selectedCount = selected?.length || 0;

  return (
    <Button
      icon={Trash2}
      isLoading={isLoading}
      variant="danger"
      onClick={async () => {
        if (window.confirm("Are you sure you want to delete these?")) {
          await onDelete({ ids: selected }).then(() => reset({ ids: [] }));
        }
      }}
      disabled={!selectedCount || isLoading}
    >
      Delete {selectedCount} selected
    </Button>
  );
}
