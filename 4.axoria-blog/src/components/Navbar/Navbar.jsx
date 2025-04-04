"use client";
import Link from "next/link";
import NavbarDropdown from "./NavbarDropdown";
import { useAuth } from "@/app/AuthContext";
import Image from "next/image";

function Navbar() {
  // const session = await sessionInfo();

  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);

  return (
    <nav className="fixed z-10 w-full bg-slate-50 border-b border-b-zinc-300">
      <div className="u-main-container flex py-4">
        <Link href="/" className="mr-2 text-zinc-900">
          AXORIA
        </Link>
        <Link href="/categories" className="mx-2 text-zinc-900 mr-auto">
          Categories
        </Link>

        {isAuthenticated.loading && (
          <div>
            <Image src="/icons/loader.svg" width={24} height={24} alt="" />
          </div>
        )}

        {isAuthenticated.isConnected && (
          <>
            <Link href="/dashboard/create" className="mx-2 text-zinc-900">
              Add an article
            </Link>
            <NavbarDropdown userId={isAuthenticated.userId} />
          </>
        )}

        {!isAuthenticated.isConnected && !isAuthenticated.loading && (
          <>
            <Link href="/signin" className="mx-2 text-zinc-900">
              Sign In
            </Link>
            <Link href="/signup" className="mx-2 text-zinc-900">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
