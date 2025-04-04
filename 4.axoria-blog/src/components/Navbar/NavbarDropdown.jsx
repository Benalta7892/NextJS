"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logOut, isPrivatePage } from "@/lib/serverActions/session/sessionServerActions";
import { useAuth } from "@/app/AuthContext";

const NavbarDropdown = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();
  const router = useRouter();

  const { setIsAuthenticated } = useAuth();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    const result = await logOut();
    if (result.success) {
      setIsAuthenticated({
        loading: false,
        isConnected: false,
        userId: null,
      });

      if (await isPrivatePage(window.location.pathname)) {
        router.push("/signin");
      }
    }
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (!dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button onClick={toggleDropdown} className="flex">
        <Image src="/icons/user.svg" alt="" width={24} height={24} />
      </button>
      {isOpen && (
        <ul className="absolute right-0 top-10 w-[250px] border-b border-x border-zinc-300">
          <li className="bg-slate-50 hover:bg-slate-200 border-b border-slate-300">
            <Link onClick={closeDropdown} href={`/dashboard/${userId}`} className="block p-4">
              Dashboard
            </Link>
          </li>
          <li className="bg-slate-50 hover:bg-slate-200">
            <button onClick={handleLogout} className="w-full p-4 text-left">
              Sign out
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};
export default NavbarDropdown;
