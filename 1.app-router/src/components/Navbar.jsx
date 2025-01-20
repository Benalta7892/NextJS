import Link from "next/link";

function Navbar() {
  return (
    <nav className="flex gap-x-2">
      <Link className="underline" href="/">
        Accueil
      </Link>
      <Link className="underline" href="/blog">
        Blog
      </Link>
      <Link className="underline" href="/dashboards">
        Dashboards
      </Link>
      <Link className="underline" href="/contact">
        Contact
      </Link>
    </nav>
  );
}
export default Navbar;
