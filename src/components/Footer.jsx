"use client";
import { navlinks, socialIcons } from "@/links";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white p-4 mt-2 dark:border-t dark:bg-[#0f0f0f] ">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Navigation Links */}
        <div className="flex space-x-4">
          <div className="flex space-x-4">
            {navlinks.map((link, index) => {
              return (
                <Link
                  key={index}
                  href={link.href}
                  className="hover:  capitalize dark:bg-transparent text-[#eee]"
                  target="_blank"
                >
                  {link.title}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Social Links */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          {socialIcons.map((icon) => {
            return (
              <Image
                className="rounded-full cursor-pointer transition-transform ease-out duration-300 transform hover:scale-150"
                src={icon.icon}
                alt=""
                width={40}
                height={40}
              />
            );
          })}
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-4 text-gray-500">
        © {new Date().getFullYear()} <Link href={'/'} className="underline text-gray-500 dark:text-gray-500">Code Service</Link>. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
