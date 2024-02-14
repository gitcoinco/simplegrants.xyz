// @vitest-environment jsdom

import React, { type ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TRPCReactProvider } from "./trpc/react";

export const TestProviders = ({ children }: { children: React.ReactNode }) => {
  return <TRPCReactProvider>{children}</TRPCReactProvider>;
};
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: TestProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };

export function setup(jsx: ReactElement) {
  return {
    user: userEvent.setup(),
    ...customRender(jsx),
  };
}
