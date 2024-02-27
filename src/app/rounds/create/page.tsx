import { currentUser } from "@clerk/nextjs";
import { PageSection } from "~/app/(layout)/_components/page-section";
import RoundFormWrapper from "../_components/round-form-wrapper";

export default async function CreateRoundPage() {
  const user = await currentUser();
  return (
    <PageSection title="Create Round">
      <RoundFormWrapper
        stripeAccount={user?.privateMetadata.stripeAccount as string}
      />
    </PageSection>
  );
}
