"use client";
import { tv } from "tailwind-variants";
import { createComponent } from "~/components/ui";

export const List = createComponent(
  "div",
  tv({ base: "divide-y rounded border" }),
);
export const ListItem = createComponent(
  "div",
  tv({ base: "flex justify-between items-center p-4" }),
);
