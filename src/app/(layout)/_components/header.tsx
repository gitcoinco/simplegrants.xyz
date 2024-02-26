import Link from "next/link";
import { type ComponentProps } from "react";
import { ShoppingCart, UserIcon } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";

import { Button } from "~/components/ui/button";
import { SignInButton } from "~/app/(auth)/_components/sign-in";

export async function Header() {
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
