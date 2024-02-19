import { Page } from "~/app/(layout)/_components/page";
import RoundFormWrapper from "../_components/round-form-wrapper";

export default async function CreateRoundPage() {
  return (
    <Page title="Create Round">
      <RoundFormWrapper />
    </Page>
  );
}
