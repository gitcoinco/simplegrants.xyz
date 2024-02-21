import { currentUser } from "@clerk/nextjs/server";
import { DollarSign, Edit, ListTodo } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageSection } from "~/app/(layout)/_components/page-section";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/server";

export default async function RoundManageLayout({
  children,
  params: { roundId },
}: {
  children: React.ReactNode;
  params: { roundId: string };
}) {
  const user = await currentUser();
  const round = await api.round.get.query({ id: roundId });
  if (!round || round?.userId !== user?.id) return notFound();

  const roundUrl = `/rounds/${roundId}`;
  return (
    <PageSection
      title={round.name}
      backLink={roundUrl}
      action={
        <nav className="flex flex-wrap gap-1">
          <Button icon={DollarSign} as={Link} href={`${roundUrl}/manage/fund`}>
            Fund round
          </Button>
          <Button icon={Edit} as={Link} href={`${roundUrl}/manage/edit`}>
            Edit round
          </Button>
          <Button
            as={Link}
            icon={ListTodo}
            href={`${roundUrl}/manage/applications`}
          >
            Applications
          </Button>
        </nav>
      }
    >
      {children}
    </PageSection>
  );
}
