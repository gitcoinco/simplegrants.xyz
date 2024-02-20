import { api } from "~/trpc/server";
import GrantFormWrapper from "../_components/grant-form-wrapper";
import { PageSection } from "~/app/(layout)/_components/page-section";

export default async function CreateGrantPage() {
  return (
    <PageSection title="Create Grant">
      <GrantFormWrapper />
    </PageSection>
  );
}
