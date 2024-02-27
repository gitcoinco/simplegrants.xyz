import { tv } from "tailwind-variants";

import { createComponent } from "..";
import { forwardRef, type ComponentPropsWithRef } from "react";
import { Search } from "lucide-react";

const inputBase = ["rounded"];
export const Input = createComponent(
  "input",
  tv({
    base: inputBase.concat("w-full form-input"),
  }),
);

export const Textarea = createComponent(
  "textarea",
  tv({
    base: inputBase.concat("w-full form-textarea"),
  }),
);

export const Select = createComponent(
  "select",
  tv({
    base: inputBase.concat("form-select"),
  }),
);

export const CheckboxInput = createComponent(
  "input",
  tv({
    base: inputBase.concat("form-checkbox"),
  }),
);

export const Checkbox = forwardRef(function RadioComponent(
  props: ComponentPropsWithRef<typeof RadioInput>,
  ref,
) {
  return <CheckboxInput type="checkbox" ref={ref} {...props} />;
});

export const RadioInput = createComponent(
  "input",
  tv({
    base: inputBase.concat("form-radio rounded-full"),
  }),
);

export const Radio = forwardRef(function RadioComponent(
  props: ComponentPropsWithRef<typeof RadioInput>,
  ref,
) {
  return <RadioInput type="radio" ref={ref} {...props} />;
});

export const InputWrapper = createComponent(
  "div",
  tv({
    base: "flex w-full relative",
    variants: {},
  }),
);

export const InputIcon = createComponent(
  "div",
  tv({
    base: "absolute text-gray-600 left-0 inline-flex items-center justify-center h-full px-4",
  }),
);

export const SearchInput = forwardRef(function SearchInput(
  { ...props }: ComponentPropsWithRef<typeof Input>,
  ref,
) {
  return (
    <InputWrapper className="">
      <InputIcon>
        <Search className="size-4" />
      </InputIcon>
      <Input type="search" ref={ref} {...props} className="pl-10" />
    </InputWrapper>
  );
});
