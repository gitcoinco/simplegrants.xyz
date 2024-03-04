import { api } from "~/trpc/server";
import { ContributionList } from "./_components/contribution-list";
import { formatMoney } from "~/utils/formatMoney";

export default async function ProfilePage() {
  const contributions = await api.session.contributions.query();

  const funded = await api.session.funded.query();

  return (
    <div>
      <div className="flex flex-col items-center pb-8">
        <div className="text-sm uppercase tracking-wider">Total funded:</div>
        <div className="text-2xl font-semibold">
          {formatMoney(funded?.amount ?? 0, "usd")}
        </div>
      </div>
      <ContributionList contributions={contributions} />;
    </div>
  );
}
