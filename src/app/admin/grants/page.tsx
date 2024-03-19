import { api } from "~/trpc/server";
import { ApproveGrants } from "../_components/approve-grants";

export default async function AdminApproveGrantsPage() {
  const grants = await api.admin.grants.query();
  return <ApproveGrants grants={grants} />;
}
