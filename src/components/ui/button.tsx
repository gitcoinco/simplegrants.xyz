import {
  createElement,
  type ComponentPropsWithRef,
  type FunctionComponent,
} from "react";
import { tv } from "tailwind-variants";

import { createComponent } from ".";
import { cn } from "~/utils/cn";
import { Spinner } from "./spinner";

const ButtonComponent = createComponent(
  "button",
  tv({
    base: "inline-flex transition-200 items-center justify-center whitespace-nowrap text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variants: {
      variant: {
        primary: "bg-primary-900 text-primary-100 hover:bg-primary-900/90 ",
        secondary: "bg-secondary-400 text-black/90 hover:bg-secondary-300 ",
        danger: "bg-red-600 text-red-100 hover:bg-red-600/90 ",
        default: "bg-gray-100 hover:bg-gray-200/80 text-gray-900",
        ghost: "hover:bg-gray-200/80 text-gray-900",
      },
      size: {
        icon: "p-3",
        md: "px-4 py-3",
        lg: "px-4 py-3 text-base font-semibold",
        xl: "px-4 py-3 text-xl font-semibold",
      },
      rounded: {
        default: "rounded-xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      rounded: "default",
      size: "md",
    },
  }),
);

export function Button({
  icon,
  children,
  isLoading,
  ...props
}: ComponentPropsWithRef<typeof ButtonComponent> & {
  /*eslint-disable @typescript-eslint/no-explicit-any */
  icon?: FunctionComponent<any>;
  isLoading?: boolean;
}) {
  const Icon = isLoading ? Spinner : icon;
  return (
    <ButtonComponent
      type="button"
      role="button"
      disabled={isLoading}
      size={icon && !children ? "icon" : undefined}
      {...props}
    >
      {Icon &&
        createElement(Icon, {
          className: cn("size-4", { ["mr-2"]: Boolean(children) }),
        })}
      {children}
    </ButtonComponent>
  );
}
