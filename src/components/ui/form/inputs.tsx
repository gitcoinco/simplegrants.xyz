import { tv } from "tailwind-variants";

import { createComponent } from "..";

const inputBase = ["rounded", "w-full"];
export const Input = createComponent(
  "input",
  tv({
    base: inputBase.concat("form-input"),
  }),
);

export const Textarea = createComponent(
  "textarea",
  tv({
    base: inputBase.concat("form-textarea"),
  }),
);

export const Select = createComponent(
  "select",
  tv({
    base: inputBase.concat("form-select"),
  }),
);

export const Label = createComponent(
  "label",
  tv({
    base: "text-gray-700 block",
  }),
);
