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
} from "~/server/api/routers/round/round.schemas";

type Props = {
  isLoading?: boolean;
  buttonText: string;
  upload: UploadFn;
  onSubmit: SubmitHandler<TRoundCreateInputSchema>;
  defaultValues?: Partial<TRoundCreateInputSchema>;
};

export function RoundForm({
  buttonText,
  defaultValues,
  isLoading,
  upload,
  onSubmit,
}: Props) {
  console.log({ defaultValues });
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
          <option value="quadratic-funding">Quadratic Funding</option>
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
        {buttonText}
      </Button>
    </Form>
  );
}

function formatDate(date: string) {
  return new Date(date);
}
