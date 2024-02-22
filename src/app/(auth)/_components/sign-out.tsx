"use client";

import { useRouter } from "next/navigation";
import { SignOutButton as SignOut } from "@clerk/nextjs";

import { Button } from "~/components/ui/button";

export function SignOutButton() {
  const router = useRouter();
  return (
    <Button>
      <SignOut signOutCallback={() => router.push("/")} />
    </Button>
  );
}
