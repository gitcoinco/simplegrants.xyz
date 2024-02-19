import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import Link from "next/link";
import { type ComponentProps } from "react";
import { getServerAuthSession } from "~/server/auth";
import { SignInButton } from "./api/(auth)/_components/sign-in";
import { Button } from "~/components/ui/button";
import { ShoppingCart, UserIcon } from "lucide-react";

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
    <html lang="en">
      <body className={`font-sans ${inter.variable} bg-gray-100`}>
        <TRPCReactProvider>
          <main className="mx-auto flex min-h-screen max-w-screen-xl flex-col bg-white">
            <Header />
            <div className="flex-1 p-4">{children}</div>
          </main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

async function Header() {
  const session = await getServerAuthSession();

  return (
    <header className="items-center justify-between p-2">
      <nav className="flex items-center justify-between">
        <div className="h-8 w-8 rounded-full bg-gray-900"></div>
        <div className="flex items-center  gap-2">
          <Button
            as={Link}
            href={`/checkout`}
            rounded="full"
            icon={ShoppingCart}
          />
          <Button as={Link} href={`/profile`} rounded="full" icon={UserIcon} />
          <SignInButton session={session} />
        </div>
      </nav>
      <nav className="flex gap-2">
        <NavLink href={"/rounds"}>Discover Rounds</NavLink>
        <NavLink href={"/rounds/create"}>Create Round</NavLink>
        <NavLink href={"/grants"}>Discover Grants</NavLink>
        <NavLink href={"/grants/create"}>Create Grant</NavLink>
      </nav>
    </header>
  );
}

function NavLink(props: ComponentProps<typeof Link>) {
  return <Link {...props} className="p-2 underline underline-offset-2" />;
}
