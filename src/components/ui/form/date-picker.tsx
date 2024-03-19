import { type ComponentPropsWithRef, forwardRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { DateInput } from "./inputs";

export const DatePicker = forwardRef(function DatePicker({
  name,
  ...props
}: Partial<ComponentPropsWithRef<typeof ReactDatePicker>>) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name as string}
      render={({ field }) => (
        <>
          <ReactDatePicker
            {...props}
            {...field}
            customInput={<DateInput />}
            selected={field.value as Date}
          />
        </>
      )}
    />
  );
});
