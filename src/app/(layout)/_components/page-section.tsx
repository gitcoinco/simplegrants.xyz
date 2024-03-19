import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import type { PropsWithChildren, ReactNode } from "react";
import { Button } from "~/components/ui/button";

export function PageSection({
  title,
  description,
  backLink,
  action,
  children,
}: PropsWithChildren<{
  backLink?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}>) {
  return (
    <div>
      <div className="mb-2 flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          {backLink && (
            <Button
              rounded="full"
              variant="ghost"
              as={Link}
              icon={ChevronLeft}
              href={backLink}
            />
          )}
          <h1 className="text-2xl font-bold sm:text-3xl ">{title}</h1>
        </div>
        {action}
      </div>
      {description && <p className="mb-2 text-lg">{description}</p>}
      {children}
    </div>
  );
}
