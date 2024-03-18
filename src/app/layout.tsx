import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import { GoogleAnalytics } from "@next/third-parties/google";

import { Footer } from "./(layout)/_components/footer";
import { Header } from "./(layout)/_components/header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "SimpleGrants.xyz",
  description: "Funding platform for grants",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
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
              <div className="flex-1 px-2 pb-24 md:px-4">{children}</div>
            </main>
            <Footer />
          </TRPCReactProvider>
        </body>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS!} />
      </html>
    </ClerkProvider>
  );
}
