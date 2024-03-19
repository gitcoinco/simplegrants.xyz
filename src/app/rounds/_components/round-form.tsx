"use client";

import { type SubmitHandler } from "react-hook-form";
import { A } from "~/components/ui/a";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { DatePicker } from "~/components/ui/form/date-picker";
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
  console.log("def", defaultValues);
  return (
    <Form
      className="mx-auto flex max-w-screen-sm flex-col gap-2"
      schema={ZRoundCreateInputSchema}
      onSubmit={onSubmit}
      defaultValues={defaultValues}
    >
      <h3 className="text-xl font-semibold">Edit Round</h3>
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
          <DatePicker name="startsAt" minDate={new Date()} />
        </Fieldset>
        <Fieldset label="Ends at" name="endsAt">
          <DatePicker name="endsAt" />
        </Fieldset>
      </div>

      <div className="items-end gap-2 sm:flex">
        <Fieldset label="Stripe account" name="stripeAccount">
          <Input />
        </Fieldset>
        <Fieldset label="Currency" name="currency">
          <Select>
            <option value="usd">USD</option>
          </Select>
        </Fieldset>
      </div>
      <div className="">
        <A href={`/profile`}>Connect your Stripe account in your profile</A>
      </div>

      <div className="flex justify-end">
        <Button variant="primary" isLoading={isLoading} type="submit">
          Save round
        </Button>
      </div>
    </Form>
  );
}
