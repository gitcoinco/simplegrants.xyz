"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";

export function SignInButton() {
  return (
    <Button
      variant="ghost"
      as={Link}
      href={"/sign-in"}
      // onClick={() => signI}
      // onClick={() => signIn("google", { callbackUrl: "/" })}
    >
      Sign in
    </Button>
  );
}
