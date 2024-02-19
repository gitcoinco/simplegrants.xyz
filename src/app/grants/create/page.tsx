import { api } from "~/trpc/server";
import GrantFormWrapper from "../_components/grant-form-wrapper";
import { PageLayout } from "~/app/(layout)/_components/page";

export default async function CreateGrantPage() {
  const user = await api.user.get.query();
  return (
    <PageLayout title="Create Grant">
      <GrantFormWrapper user={user} />
    </PageLayout>
  );
}
