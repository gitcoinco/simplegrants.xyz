import { forwardRef, type ComponentPropsWithRef } from "react";
import { NumericFormat } from "react-number-format";
import { useFormContext, Controller } from "react-hook-form";

import { Input, InputIcon, InputWrapper } from "./ui/form/inputs";

export const CurrencyInput = forwardRef(function CurrencyInputComponent(
  {
    name,
    currency,
    onBlur,
    ...props
  }: {
    currency: string;
    disabled?: boolean;
    error?: boolean;
    onBlur?: (value: string | number) => void;
  } & ComponentPropsWithRef<"input">,
  ref,
) {
  const form = useFormContext();

  return (
    <InputWrapper className="min-w-[160px]">
      <InputIcon>{currency}</InputIcon>
      <Controller
        control={form.control}
        name={name!}
        {...props}
        render={({ field }) => (
          <NumericFormat
            aria-label="currency-input"
            customInput={Input}
            error={props.error}
            {...field}
            autoComplete="off"
            className="pl-8 pr-16"
            disabled={props.disabled}
            defaultValue={props.defaultValue as string}
            onChange={(e) => {
              /* eslint-disable-next-line */
              const value = parseFloat(e.target.value.replace(/,/g, ""));
              field.onChange(value);
              onBlur?.(value);
            }}
            thousandSeparator=","
          />
        )}
      />
    </InputWrapper>
  );
});
