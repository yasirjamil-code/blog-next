import Image from "next/image";
import Link from "next/link";
import React from "react";

const SingleBlogs = ({ id, title, date, blogImage, category, searchPost }) => {
  const blogDate = date ? new Date(date) : new Date(); // Ensure date is valid

  return (
    <div className="w-[380px] hover:bg-blue-100 *:text-black dark:*:dark:text-[#eee] dark:hover:bg-[#2b2a2a] transition-all p-2 mt-8  ">
      <div className="bg-white shadow-lg flex flex-col justify-between dark:bg-[#0F0F0F]  dark:border items-center rounded-lg overflow-hidden min-h-[320px]">
        <Link
          target="_blank"
        href={`/blog/${id}`}
          className="ml-10 mt-5 w-full mr-10"
        >
          <Image
            src={blogImage}
            alt={title}
            className="w-full h-48 object-cover rounded-md"
            height={192}
            width={300}
          />
        </Link>
        <div className="pb-4">
          <h3
            className="text-lg font-medium mb-2 max-w-[320px]"
            style={{ wordSpacing: "0.1rem" }}
          >
            {title.length > 40 ? title.slice(0, 40) + "..." : title}
            &nbsp;
            <Link
              target="_blank"
              href={`/blog/${id}`}
              className="text-blue-600 dark:text-blue-600 text-[16px] hover:underline"
            >
              Read more
            </Link>
          </h3>
          <div className="flex justify-between gap-4 items-center">
            <span>{blogDate.toLocaleDateString()}</span>
            <button className="bg-blue-500 capitalize text-white px-3 py-1 rounded">
              {category}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogs;
