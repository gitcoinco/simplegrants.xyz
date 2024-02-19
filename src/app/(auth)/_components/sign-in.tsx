"use client";

import { signIn } from "next-auth/react";
import { Button } from "~/components/ui/button";

export function SignInButton() {
  return (
    <Button
      variant="ghost"
      onClick={() => signIn("google", { callbackUrl: "/" })}
    >
      Sign in
    </Button>
  );
}
