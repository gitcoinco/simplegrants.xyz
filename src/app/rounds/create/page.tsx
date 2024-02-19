import { PageLayout } from "~/app/(layout)/_components/page";
import RoundFormWrapper from "../_components/round-form-wrapper";

export default async function CreateRoundPage() {
  return (
    <PageLayout title="Create Round">
      <RoundFormWrapper />
    </PageLayout>
  );
}
