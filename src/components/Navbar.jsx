"use client";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { navlinks } from "@/links";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext); // Access theme and toggle function from context
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
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

  return (
    <nav className="sticky dark:bg-[#0F0F0F] text-white dark:border-b dark:text-white top-0 z-[1000] bg-[#1F2937] shadow-[box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)] text-black flex items-center py-3 justify-between px-10">
      <div className="logo  flex-1">
        <Link href={"/"} className="w-max">
          <Image
            src={theme === "dark" ? "/logolight.png" : "/logo.png"}
            width={100}
            height={100}
            alt="Logo"
            className="W"
          />
        </Link>
      </div>

      <div className="navlinks max-[1280px]:hidden flex gap-4 capitalize *:font-medium flex-1 ml-10">
        {navlinks.map(({ title, href, id }) => (
          <Link
            className="relative transition-all ease-in duration-300"
            key={id}
            href={href}
          >
            <span className="after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-current after:left-0 after:bottom-0 after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform ">
              {title}
            </span>
          </Link>
        ))}
      </div>

      <div className="flex gap-4 items-center flex-1">
        <button
          onClick={toggleTheme}
          className="dark:border-none dark:hover:border-none"
        >
          <Image
            alt="Theme Toggle"
            width={30}
            height={30}
            src={theme === "dark" ? "/sun.png" : "/moon.png"}
          />
        </button>

        {session ? (
          <>
            <span className="font-bold border-1 border-black">
              Hi, {session.user.name.slice(0, 10)}..
            </span>
            <button
              className="px-2 py-1 rounded-md font-bold bg-orange-900 text-white"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <span className="font-bold border-1 border-black">
              {status === "loading"
                ? "Please wait a secs..."
                : "Please Register Yourself"}
            </span>
            <Link
              href={"/login"}
              className="px-2 py-1 rounded-md font-bold border dark:border dark:border-gray-300 border-gray-900 dark:hover:bg-gray-800 bg-[#d0a039] text-blue-950"
            >
              {status === "loading" ? "Checking..." : "Login"}
            </Link>
          </>
        )}

        {session && (
          <div>
            <div
              className="p-1rounded-full cursor-pointer relative"
              onClick={() => setOpen((prev) => !prev)}
            >
              <div className="div w-2 h-2 absolute left-5 top-5 rounded-full bg-green-700"></div>
              <Image
                src={session.user.image || "logo.png"}
                width={30}
                height={30}
                alt="User Image"
                className="rounded-full"
              />
            </div>
            {open === true ? (
              <div className="absolute top-5 right-5" ref={divRef}>
                <Link
                  className="px-4 dark:border border-gray-200 dark:bg-gray-400 py-2 bg-blue-900 rounded-full font-medium hover:opacity-90 hover:scale-[10px] text-white"
                  href={"/admin"}
                >
                  Admin
                </Link>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
