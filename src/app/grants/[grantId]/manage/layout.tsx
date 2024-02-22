import { currentUser } from "@clerk/nextjs/server";
import { DollarSign, Edit, ListTodo } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageSection } from "~/app/(layout)/_components/page-section";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/server";

export default async function GrantManageLayout({
  children,
  params: { grantId },
}: {
  children: React.ReactNode;
  params: { grantId: string };
}) {
  const user = await currentUser();
  const grant = await api.grant.get.query({ id: grantId });
  if (!grant || grant?.userId !== user?.id) return notFound();

  const grantUrl = `/grants/${grantId}`;
  return (
    <PageSection
      title={grant.name}
      backLink={grantUrl}
      action={
        <nav className="flex flex-wrap gap-1">
          <Button icon={Edit} as={Link} href={`${grantUrl}/manage/edit`}>
            Edit grant
          </Button>
        </nav>
      }
    >
      {children}
    </PageSection>
  );
}
