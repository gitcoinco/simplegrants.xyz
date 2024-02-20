import { tv } from "tailwind-variants";

import { createComponent } from "..";
import { forwardRef, type ComponentPropsWithRef } from "react";

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
    base: inputBase.concat("w-full form-select"),
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
