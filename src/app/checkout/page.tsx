import { PageSection } from "../(layout)/_components/page-section";
import CheckoutFormWrapper from "./_components/checkout-form-wrapper";

export default async function CheckoutPage() {
  return (
    <PageSection title="Checkout">
      <CheckoutFormWrapper />
    </PageSection>
  );
}
