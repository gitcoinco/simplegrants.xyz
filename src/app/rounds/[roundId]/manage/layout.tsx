import { currentUser } from "@clerk/nextjs/server";
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
    </PageSection>
  );
}
