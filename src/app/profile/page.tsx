import { api } from "~/trpc/server";
import { ContributionList } from "./_components/contribution-list";

export default async function ProfilePage() {
  const contributions = await api.session.contributions.query();
  return <ContributionList contributions={contributions} />;
}
