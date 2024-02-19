import { redirect } from "next/navigation";
import { api } from "~/trpc/server";

export default async function VerifyProfilePage({
  searchParams: { code = "" },
}) {
  if (code) {
    try {
      await api.stripe.verifyAccount.mutate({ code });
    } catch (error) {}
  }

  return redirect("/profile");
}
