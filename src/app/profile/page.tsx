import Image from "next/image";
import { notFound } from "next/navigation";
import { api } from "~/trpc/server";
import { ConnectStripe } from "./_components/connect-stripe";

export default async function ProfilePage() {
  const profile = await api.user.get.query();
  console.log(profile);
  if (!profile) {
    return notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Profile</h1>
      <Image
        width={96}
        height={96}
        className="rounded-full"
        src={profile.imageUrl}
        alt={profile.firstName!}
      />
      <h3 className="text-lg font-semibold">{profile.firstName}</h3>
      <div>{profile.emailAddresses[0]?.emailAddress}</div>

      <ConnectStripe stripeAccount={profile.privateMetadata?.stripeAccount} />
    </div>
  );
}
