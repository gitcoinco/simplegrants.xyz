import { api } from "~/trpc/server";
import { GrantsList } from "../_components/grants-list";

export default async function ProfileGrantsPage() {
  const grants = await api.session.grants.query();
  return <GrantsList grants={grants} />;
}
