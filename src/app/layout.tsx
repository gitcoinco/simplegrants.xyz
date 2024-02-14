import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import Link from "next/link";
import { type ComponentProps } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Web2Grants",
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
          <main className="mx-auto min-h-screen max-w-screen-xl bg-white p-4">
            <Header />
            {children}
          </main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

function Header() {
  return (
    <header>
      <nav className="flex gap-2">
        <NavLink href={"/rounds"}>Discover Rounds</NavLink>
        <NavLink href={"/rounds/create"}>Create Round</NavLink>
      </nav>
    </header>
  );
}

function NavLink(props: ComponentProps<typeof Link>) {
  return <Link {...props} className="bg-gray-100 p-2" />;
}
