"use client";

import { type SubmitHandler } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { Fieldset } from "~/components/ui/form/fieldset";
import { ImageUpload, type UploadFn } from "~/components/ui/form/image-upload";
import { Input, Select, Textarea } from "~/components/ui/form/inputs";
import {
  ZRoundCreateInputSchema,
  type TRoundCreateInputSchema,
  type TRoundUpdateInputSchema,
  distributionTypes,
} from "~/server/api/routers/round/round.schemas";

type Props = {
  isLoading?: boolean;
  upload: UploadFn;
  onSubmit: SubmitHandler<TRoundCreateInputSchema>;
  defaultValues?: TRoundUpdateInputSchema;
};

export function RoundForm({
  defaultValues,
  isLoading,
  upload,
  onSubmit,
}: Props) {
  return (
    <Form
      schema={ZRoundCreateInputSchema}
      onSubmit={onSubmit}
      defaultValues={defaultValues}
    >
      <Fieldset label="Name" name="name">
        <Input />
      </Fieldset>
      <Fieldset label="Cover image" name="image">
        <ImageUpload className="h-48" upload={upload} />
      </Fieldset>
      <Fieldset label="Description" name="description">
        <Textarea rows={6} />
      </Fieldset>
      <Fieldset label="Distribution type" name="distributionType">
        <Select>
          {distributionTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </Select>
      </Fieldset>
      <div className="mb-2 gap-2 sm:flex">
        <Fieldset label="Starts at" name="startsAt">
          <Input />
        </Fieldset>
        <Fieldset label="Ends at" name="endsAt">
          <Input />
        </Fieldset>
      </div>
      <Button
        variant="primary"
        isLoading={isLoading}
        type="submit"
        className="w-full"
      >
        Save round
      </Button>
    </Form>
  );
}
