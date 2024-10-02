"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  const pathname = usePathname();
  console.log(pathname);
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex justify-between items-center p-4 border-b mb-5 ">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex gap-4">
        {links.map((link) => (
          <li
            key={link.href}
            className={clsx("hover:text-zinc-800 font-semibold", {
              "text-zinc-500": pathname !== link.href,
              "text-zinc-900": pathname === link.href,
            })}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
