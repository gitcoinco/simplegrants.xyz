import { api } from "~/trpc/server";
import { GrantsList } from "../_components/grants-list";
import { formatMoney } from "~/utils/formatMoney";

export default async function ProfileGrantsPage() {
  const grants = await api.session.grants.query();

  const funding = await api.session.funding.query();

  return (
    <div>
      <div className="flex flex-col items-center pb-8">
        <div className="text-sm uppercase tracking-wider">Total funding:</div>
        <div className="text-2xl font-semibold">
          {formatMoney(funding?.amount ?? 0, "usd")}
        </div>
      </div>
      <GrantsList grants={grants} />;
    </div>
  );
}
