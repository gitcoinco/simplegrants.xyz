"use client";

import { type SubmitHandler } from "react-hook-form";
import { A } from "~/components/ui/a";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { Fieldset } from "~/components/ui/form/fieldset";
import { ImageUpload, type UploadFn } from "~/components/ui/form/image-upload";
import { Input, Select, Textarea } from "~/components/ui/form/inputs";
import {
  ZGrantCreateInputSchema,
  type TGrantUpdateInputSchema,
  type TGrantCreateInputSchema,
} from "~/server/api/routers/grant/grant.schemas";

type Props = {
  isLoading?: boolean;
  upload: UploadFn;
  onSubmit: SubmitHandler<TGrantCreateInputSchema>;
  defaultValues?: TGrantUpdateInputSchema;
};

export function GrantForm({
  defaultValues,
  isLoading,
  upload,
  onSubmit,
}: Props) {
  return (
    <Form
      className="mx-auto flex max-w-screen-sm flex-col gap-2"
      schema={ZGrantCreateInputSchema}
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
          Save grant
        </Button>
      </div>
    </Form>
  );
}
