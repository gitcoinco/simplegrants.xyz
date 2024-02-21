import type { ComponentProps } from "react";
import ReactMarkdown from "react-markdown";

export function Markdown(props: ComponentProps<typeof ReactMarkdown>) {
  return (
    <div className="prose prose-lg">
      <ReactMarkdown {...props} />
    </div>
  );
}
