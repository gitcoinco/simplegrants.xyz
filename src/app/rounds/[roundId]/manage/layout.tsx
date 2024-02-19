import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";
import "~/styles/globals.css";
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
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            rounded="full"
            variant="ghost"
            as={Link}
            icon={ChevronLeft}
            href={roundUrl}
          />
          <h1 className="text-2xl font-semibold">{round.name}</h1>
        </div>
        <nav className="flex gap-1">
          <Button as={Link} href={`${roundUrl}/manage/edit`}>
            Edit
          </Button>
          <Button as={Link} href={`${roundUrl}/manage/applications`}>
            Applications
          </Button>
        </nav>
      </div>
      <div>{children}</div>
    </div>
  );
}
