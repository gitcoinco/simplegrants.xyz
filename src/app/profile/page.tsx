import Image from "next/image";
import { notFound } from "next/navigation";
import { api } from "~/trpc/server";
import { ConnectStripe } from "./_components/connect-stripe";

export default async function ProfilePage() {
  const profile = await api.user.get.query();

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
        src={profile.image!}
        alt={profile.name!}
      />
      <h3 className="text-lg font-semibold">{profile.name}</h3>
      <div>{profile.email}</div>

      <ConnectStripe stripeAccount={profile.stripeAccount} />
    </div>
  );
}
