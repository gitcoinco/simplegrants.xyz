import { api } from "~/trpc/server";
import GrantFormWrapper from "../_components/grant-form-wrapper";
import { PageSection } from "~/app/(layout)/_components/page-section";

export default async function CreateGrantPage() {
  const user = await api.user.get.query();
  return (
    <PageSection title="Create Grant">
      <GrantFormWrapper user={user} />
    </PageSection>
  );
}
