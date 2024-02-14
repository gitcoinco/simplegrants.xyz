import { unstable_noStore as noStore } from "next/cache";

import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  noStore();
  const session = await getServerAuthSession();

  return <main>web2grants</main>;
}
