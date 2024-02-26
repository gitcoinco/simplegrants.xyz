import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import Link from "next/link";
import { type ComponentProps } from "react";
import { SignInButton } from "./(auth)/_components/sign-in";
import { Button } from "~/components/ui/button";
import { ShoppingCart, UserIcon } from "lucide-react";
import { ClerkProvider } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "SimpleGrants.xyz",
  description: "Funding platform for grants",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider signInUrl="/sign-in">
      <html lang="en">
        <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />
        <body className={`font-sans ${inter.variable} bg-gray-100`}>
          <TRPCReactProvider>
            <main className="mx-auto flex min-h-screen max-w-screen-xl flex-col bg-white">
              <Header />
              <div className="flex-1 px-4 pb-24">{children}</div>
            </main>
            <footer className="bg-gray-900 py-24 text-gray-300"></footer>
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

async function Header() {
  const user = await currentUser();

  return (
    <header className="items-center justify-between p-2">
      <nav className="flex items-center justify-between">
        <Link href={"/"} className="">
          <div className="h-8 w-8 rounded-full border-[16px] border-gray-900 transition-all hover:border-4 hover:bg-transparent" />
        </Link>
        <nav className="flex gap-2">
          <NavLink href={"/rounds"}>
            <span className="hidden pr-1 sm:inline">Discover </span>
            Rounds
          </NavLink>
          <NavLink href={"/grants"}>
            <span className="hidden pr-1 sm:inline">Discover </span>
            Grants
          </NavLink>
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Button
                as={Link}
                href={`/checkout`}
                rounded="full"
                variant="ghost"
                icon={ShoppingCart}
              />
              <Button
                as={Link}
                href={`/profile`}
                rounded="full"
                icon={UserIcon}
              />
            </>
          ) : (
            <SignInButton />
          )}
        </div>
      </nav>
    </header>
  );
}

function NavLink(props: ComponentProps<typeof Link>) {
  return <Button as={Link} variant="ghost" {...props} />;
}
