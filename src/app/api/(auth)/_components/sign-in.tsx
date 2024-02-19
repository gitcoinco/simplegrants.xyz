"use client";

import type { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { Button } from "~/components/ui/button";

export function SignInButton({ session }: { session: Session | null }) {
  if (session) return <Button onClick={() => signOut()}>Sign out</Button>;

  return (
    <Button onClick={() => signIn("google", { callbackUrl: "/" })}>
      Sign in
    </Button>
  );
}
