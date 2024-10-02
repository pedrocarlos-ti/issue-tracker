import Link from "next/link";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
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
            className="text-zinc-500 hover:text-zinc-800 transition-colors"
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
