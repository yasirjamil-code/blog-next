"use client";
import { useContext, useState, useRef, useEffect } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { navlinks } from "@/links";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext); // Access theme and toggle function from context
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // For mobile menu toggle
  const divRef = useRef(null);

  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMobileMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const logOut = () => {
  const confirmed =  confirm("Are You want to logout");
    if (confirmed) {
      signOut();
    }
  };

  return (
    <nav className="sticky top-0 z-[1000] bg-[#101215] dark:bg-[#0F0F0F] text-white dark:border-b shadow-lg flex items-center justify-between lg:justify-between py-3 px-10">
      {/* Logo Section */}
      <div className="logo flex w-[350px] items-center">
        <Link href={"/"}>
          <Image
            src={theme === "dark" ? "/logolight.png" : "/logo.png"}
            width={100}
            height={100}
            alt="Logo"
            className="w-auto"
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <div
        className={`navlinks flex-1 sm:flex hidden gap-4 capitalize font-medium ml-10`}
      >
        {navlinks.map(({ title, href, id }) => (
          <Link
            key={id}
            href={href}
            className="relative transition-all ease-in duration-300"
          >
            <span className="after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-current after:left-0 after:bottom-0 after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform">
              {title}
            </span>
          </Link>
        ))}
      </div>

      {/* User Profile and Theme Toggle */}
      <div className="flex gap-4 items-center">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="rounded-full hidden md:block hover:scale-110 transition-all dark:hover:border-none dark:border-none"
        >
          <Image
            alt="Theme Toggle"
            width={30}
            height={30}
            src={theme === "dark" ? "/sun.png" : "/moon.png"}
          />
        </button>

        {/* User Sign-in/Sign-out */}
        {session ? (
          <div className="hidden md:block">
            <span className="font-bold border-1  border-black">
              Hi, {session.user.name.slice(0, 10)}..
            </span>
            <button
              className="px-2 py-1 rounded-md font-bold bg-orange-900 text-white"
              onClick={logOut}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <>
            <span className="font-bold hidden sm:block">
              {" "}
              {status === "loading"
                ? "Please wait..."
                : "Please Register Yourself"}
            </span>
            <Link
              href={"/login"}
              className="px-2 py-1 rounded-md font-bold border dark:border-gray-300 bg-[#d0a039] text-blue-950"
            >
              {status === "loading" ? "Checking..." : "Login"}
            </Link>
          </>
        )}

        {/* Profile Dropdown for Logged-in Users */}
        {session && (
          <div className="relative">
            <div className="p-1 rounded-full cursor-pointer flex gap-4">
              <div className="w-2 h-2 absolute left-5 top-5 rounded-full bg-green-700"></div>
              <Image
                onClick={() => setOpen((prev) => !prev)}
                src={session.user.image || "logo.png"}
                width={30}
                height={30}
                alt="User Image"
                className="rounded-full"
              />
              {/* Mobile Menu Button */}
            </div>
            {open && (
              <div
                className="absolute top-10 right-0 bg-gray-800 rounded-md shadow-lg p-2"
                ref={divRef}
              >
                <Link
                  className="px-4 py-2 bg-blue-900 rounded-full font-medium text-white hover:opacity-90"
                  href={"/admin"}
                >
                  Admin
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Navigation Links (Hidden on Desktop) */}
      {menuOpen && (
        <div
          className="sm:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
          onClick={handleMobileMenuToggle}
        >
          <div className="bg-white dark:bg-[#0F0F0F] p-6 rounded-md w-2/3">
            {navlinks.map(({ title, href, id }) => (
              <Link
                key={id}
                href={href}
                className="block py-2 text-center text-black capitalize"
              >
                {title}
              </Link>
            ))}
            {status === "authenticated" ? (
              <button
                onClick={signOut}
                className="block ml-[69px] py-2 text-center text-black capitalize"
              >
                Logout
              </button>
            ) : (
              <Link
                href={"/login"}
                className="block py-2 text-center text-black capitalize"
              >
                Login
              </Link>
            )}
            <div className="flex justify-center items-center mt-4 ">
              <button className="rounded-full p-2 dark:border-none" onClick={toggleTheme}>
                <Image
                  src={theme === "dark" ? "/sun.png" : "/moon.png"}
                  width={30}
                  height={30}
                  alt="Theme Toggle"
                />
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        className="sm:hidden flex ml-3 dark:border-none dark:hover:border-none items-center"
        onClick={handleMobileMenuToggle}
      >
        <Image className="dark:border-none border-none" src="/menu.svg" width={30} height={30} alt="Menu" />
      </button>
    </nav>
  );
};

export default Navbar;
