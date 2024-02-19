import Link from "next/link";
import { notFound } from "next/navigation";
import { PageLayout } from "~/app/(layout)/_components/page";
import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function RoundManageLayout({
  children,
  params: { roundId },
}: {
  children: React.ReactNode;
  params: { roundId: string };
}) {
  const session = await getServerAuthSession();
  const round = await api.round.get.query({ id: roundId });
  if (!round || round?.createdById !== session?.user.id) return notFound();

  const roundUrl = `/rounds/${roundId}`;
  return (
    <PageLayout
      title={round.name}
      backLink={roundUrl}
      action={
        <nav className="flex gap-1">
          <Button as={Link} href={`${roundUrl}/manage/edit`}>
            Edit
          </Button>
          <Button as={Link} href={`${roundUrl}/manage/applications`}>
            Applications
          </Button>
        </nav>
      }
    >
      {children}
    </PageLayout>
  );
}
