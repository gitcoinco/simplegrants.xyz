import { api } from "~/trpc/server";
import GrantFormWrapper from "../_components/grant-form-wrapper";

export default async function CreateGrantPage() {
  const user = await api.user.get.query();
  return (
    <div>
      Create Grant page
      <GrantFormWrapper user={user} />
    </div>
  );
}
