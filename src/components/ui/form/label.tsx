import { tv } from "tailwind-variants";
import { createComponent } from "..";

export const Label = createComponent(
  "label",
  tv({ base: "text-gray-700 block" }),
);
