"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-x-2">
      <Link className={`underline ${pathname === "/" && "bg-red-600"}`} href="/">
        Accueil
      </Link>
      <Link className={`underline ${pathname === "/blog" && "bg-red-600"}`} href="/blog">
        Blog
      </Link>
      <Link className={`underline ${pathname === "/dashboards" && "bg-red-600"}`} href="/dashboards">
        Dashboards
      </Link>
      <Link className={`unederline ${pathname === "/contact" && "bg-red-600"}`} href="/contact">
        Contact
      </Link>
    </nav>
  );
}
export default Navbar;
