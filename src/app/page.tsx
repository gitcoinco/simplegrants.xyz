import Link from "next/link";
import type { ComponentProps, PropsWithChildren } from "react";

export default async function LandingPage() {
  return (
    <main>
      <div className="mx-auto max-w-screen-md items-center space-y-6 py-24 text-center">
        <h1 className="text-balance text-5xl font-semibold leading-snug md:text-7xl">
          Fund What Matters
        </h1>
        <h3 className="text-xl md:text-2xl">
          SimpleGrants.xyz allows you to harness the power of Quadratic Funding
          to fund what matters in your community
        </h3>
      </div>
      <section className="flex flex-col gap-4 py-16 md:flex-row">
        <Feature title="Supporting projects?">
          <A href={`/rounds/create`}>Create a round</A>
        </Feature>
        <Feature title="Looking for funding?">
          <A href={`/rounds`}>Discover rounds</A>
        </Feature>
        <Feature title="Manage your grant?">
          <A href={`/grants/create`}>Create a grant</A>
        </Feature>
      </section>
    </main>
  );
}

function Feature({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <div className="flex h-48 flex-col justify-between rounded-xl bg-gray-900 px-8 py-6 text-white md:w-1/3">
      <h3 className="mb-4 text-2xl font-semibold">{title}</h3>
      <div className="text-right">{children}</div>
    </div>
  );
}

function A(props: ComponentProps<typeof Link>) {
  return (
    <Link
      className="underline underline-offset-2 hover:text-gray-300"
      {...props}
    />
  );
}
