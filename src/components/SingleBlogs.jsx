import Image from "next/image";
import Link from "next/link";
import React from "react";

const SingleBlogs = ({ id, title, date, blogImage, category }) => {
  return (
    <div className="w-full sm:w-[355px] md:w-[380px] hover:bg-blue-100 dark:hover:bg-[#2b2a2a] transition-all p-2 mt-8 rounded-lg">
      <div className="bg-white shadow-lg dark:bg-[#0F0F0F] dark:border items-center rounded-lg overflow-hidden min-h-[320px]">
        <Link href={`/blog/${id}`} target="_blank" className="relative w-full">
          <Image
            src={blogImage}
            alt={title}
            className="w-full h-48 object-cover rounded-md"
            height={192}
            width={300}
          />
        </Link>
        <div className="pb-4 px-2">
          <h3
            className="text-lg font-medium mb-2 max-w-[320px] text-center"
            style={{ wordSpacing: "0.1rem" }}
          >
            {title.length > 40 ? title.slice(0, 40) + "..." : title}
            <Link
              href={`/blog/${id}`}
              className="text-blue-600 dark:text-blue-400 text-[16px] hover:underline"
            >
              &nbsp;Read more
            </Link>
          </h3>
          <div className="flex justify-between gap-4 items-center">
            <span>{new Date(date).toLocaleDateString()}</span>
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
