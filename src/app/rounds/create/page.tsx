import { PageSection } from "~/app/(layout)/_components/page-section";
import RoundFormWrapper from "../_components/round-form-wrapper";

export default async function CreateRoundPage() {
  return (
    <PageSection title="Create Round">
      <RoundFormWrapper />
    </PageSection>
  );
}
