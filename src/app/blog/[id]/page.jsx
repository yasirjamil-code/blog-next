"use client";
import Loading from "@/components/Loading";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const BlogData = ({ params }) => {
  const { data: session, status } = useSession();
  const [recentPosts, setRecentPosts] = useState([]);
  const [data, setData] = useState(null);

  const fetchBlogData = async () => {
    const response = await axios.get("/api/blog", {
      params: { id: params.id },
    });
    setData(response.data.singleBlog);
  };

  const fetchBlogsRecent = async () => {
    try {
      const response = await axios.get("/api/blog");
      if (response.data.blogs) {
        setRecentPosts(response.data.blogs);
        console.log(response.data.blogs);
      } else {
        console.warn("No blogs found");
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogData();
    fetchBlogsRecent();
  }, []);

  if (!data) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex flex-col md:flex-row gap-8">
      {/* Left Side: Blog Content */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="title text-center">
          <h1 className="font-bold text-3xl md:text-4xl capitalize">{data.title}</h1>
        </div>

        {/* Blog Image */}
        <div className="w-full relative h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden rounded-lg shadow-md">
          <Image
            src={data.blogImage}
            alt={data.title}
            layout="fill"
            objectFit="cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="object-cover"
          />
        </div>

        {/* Author Info */}
        <div className="flex items-center justify-center gap-3">
          <Image
            src={
              data.author === "John Doe"
                ? "/author-img/john.png"
                : data.author === "Helena Lim"
                ? "/author-img/helena.png"
                : data.author === "Mr.Smith"
                ? "/author-img/smith.png"
                : "/icon.png"
            }
            alt="Author"
            width={50}
            height={50}
            className="rounded-full"
          />
          <span className="font-semibold">{data.author}</span>
        </div>

        {/* Blog Description */}
        <div className="description text-lg">
          <p dangerouslySetInnerHTML={{ __html: data.description }} />
        </div>
      </div>

      {/* Right Side: Recent Posts */}
      <div className="w-full md:w-[35%] p-4 bg-white dark:bg-[#1c1c1c] rounded-lg shadow-md">
        <h2 className="font-bold text-2xl text-center mb-4">Recent Posts</h2>
        {recentPosts.reverse().slice(0, 6).map((post) => (
          <div
            key={post._id}
            className="px-4 py-2 dark:border dark:border-gray-800 hover:bg-[#f7f7f7] dark:hover:bg-[#333333] transition-colors duration-300 rounded-lg mb-4 cursor-pointer shadow-sm"
          >
            <Link href={`/blog/${post._id}`} className="flex gap-4 items-center">
              <div className="w-2/3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{post.title}</h3>
              </div>
              <div className="w-1/3">
                <Image
                  src={post.blogImage}
                  alt={post.title}
                  width={100}
                  height={100}
                  className="rounded-md"
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogData;
