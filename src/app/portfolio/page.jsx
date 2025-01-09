"use client";
import Image from "next/image";
import { useState } from "react";

const skillsArray = [
  { title: "HTML", img: "/icon-svg/html.svg" },
  { title: "CSS", img: "/icon-svg/css.svg" },
  { title: "JS", img: "/icon-svg/js.svg" },
  { title: "Tailwind CSS", img: "/icon-svg/tailwind.svg" },
  { title: "React JS", img: "/icon-svg/reactjs.svg" },
  { title: "Next JS", img: "/icon-svg/nextjs.svg" },
  { title: "Node JS", img: "/icon-svg/nodejs.svg" },
  { title: "MongoDB", img: "/icon-svg/mongodb.svg" },
  { title: "NextAuth", img: "/icon-svg/nextauth.png" },
  { title: "GitHub", img: "/github.png" },
];

export default function Portfolio() {
  return (
    <div className="bg-gray-50 dark:bg-[#0F0F0F] text-black dark:text-white min-h-screen flex flex-col justify-center items-center transition-colors duration-300">
      {/* Header Section */}
      <header className="w-full text-center py-16 bg-gradient-to-r text-black from-indigo-200 to-purple-200 dark:from-gray-900 to-purple-980 dark:text-white shadow-lg">
        <h1 className="text-5xl font-extrabold">Yasir Jamil</h1>
        <p className="text-xl mt-4">
          Web Developer | ReactJS | NextJS | TailwindCSS
        </p>
      </header>

      {/* Image Section */}
      <section className="mt-8">
        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl">
          <Image
            src="/profile.png"
            alt="Yasir Jamil"
            width={192}
            height={192}
            className="object-cover"
          />
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-12 px-6 max-w-3xl text-center">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
          About Me
        </h2>
        <p className="text-lg mt-6">
          Hi, I'm Yasir Jamil, a passionate web developer with experience in
          HTML, CSS, JavaScript, ReactJS, and Next.js. I love creating modern,
          responsive, and user-friendly websites. I enjoy the process of
          building clean, efficient, and scalable web applications. My goal is
          to keep learning and delivering high-quality web solutions. You can
          download my resume
          <a
            className="text-blue-500 dark:text-blue-500"
            href="/resume.pdf"
            download="WebDev_Resume.pdf"
          >
            Click here to download my resume
          </a>
          .
        </p>
      </section>

      {/* Skills Section */}
      <section className="bg-gray-100 dark:bg-[#0F0F0F] py-12 w-full">
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white">
          My Skills
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 mt-8 max-w-4xl mx-auto">
          {skillsArray.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer transition-transform ease-out duration-300 transform hover:scale-150 "
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg shadow-lg">
                <Image
                  src={skill.img}
                  width={60}
                  height={60}
                  alt={skill.title}
                  className="rounded-md"
                />
              </div>
              <span className="mt-2 text-sm text-gray-700 dark:text-white">
                {skill.title}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-6 max-w-xl text-center">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
          Contact Me
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mt-4">
          Feel free to reach out for collaboration or inquiries.
        </p>
        <a
          href="/contact-us"
          target="_blank"
          className="mt-8 inline-block  text-white py-3 px-6 rounded-md text-xl transition duration-200 ease-in-out transform hover:scale-110 bg-blue-500 dark:border dark:hover:bg-[#161719]"
        >
          Get in Touch
        </a>
      </section>
    </div>
  );
}
