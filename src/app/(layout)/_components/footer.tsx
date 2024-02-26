import Link from "next/link";
import { Logo } from "./logo";

const footerLinks = {
  Company: [
    {
      children: "About",
      href: "/about",
    },
  ],
  Learn: [
    {
      children: "Github",
      href: "https://www.github.com/gitcoinco/simplegrants.xyz",
      target: "_blank",
    },
  ],
};
export function Footer() {
  return (
    <footer className="bg-gray-900 px-4 py-16 text-gray-300">
      <div className="mx-auto max-w-screen-xl">
        <div className="sm:flex">
          <div className="mb-16 sm:mb-0 sm:pr-12 md:pr-48">
            <div className="mb-8">
              <Logo />
            </div>
            <div className="text-sm text-gray-500">
              Gitcoin © 2024 - ∞ futures
            </div>
          </div>
          <ul className="gap-24 space-y-4 sm:flex sm:space-y-0">
            {Object.entries(footerLinks).map(([category, items]) => (
              <li key={category}>
                <h5 className="font-bold">{category}</h5>
                <ul>
                  {items.map((item) => (
                    <li key={item.href}>
                      <Link className="hover:text-gray-400" {...item} />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
