import type { ComponentProps } from "react";
import ReactMarkdown from "react-markdown";
import { cn } from "~/utils/cn";

export function Markdown({
  className,
  ...props
}: ComponentProps<typeof ReactMarkdown>) {
  return (
    <div className={cn("prose md:prose-lg", className)}>
      <ReactMarkdown {...props} />
    </div>
  );
}
