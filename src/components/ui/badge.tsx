import { tv } from "tailwind-variants";
import { createComponent } from ".";

export const Badge = createComponent(
  "div",
  tv({
    base: "inline-flex gap-1 items-center whitespace-nowrap rounded font-semibold text-gray-500 text-sm",
    variants: {
      variant: {
        default: "bg-gray-100",
        success: "bg-green-200 text-green-900",
      },
      size: {
        md: "py-1 px-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }),
);
