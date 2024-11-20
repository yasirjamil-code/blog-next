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
    return <Loading/>;
  }

  return (
    <div className=" flex justify-between ml-[70px] w-full max-w-6xl gap-4 mt-8">
      {/* Left Side: Blog Content */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="title text-center">
          <h1 className="font-bold text-3xl capitalize">{data.title}</h1>
        </div>
        <div className="blogImage w-full h-[400px] relative overflow-hidden">
          <Image
            src={data.blogImage}
            alt={data.title}
            layout="fill"
            objectFit="cover"
            sizes="(max-width: 768px) 100vw, 50vw" // Adjust based on your layout
            priority // Add priority for LCP
            className="object-cover"
          />
        </div>
        <div className="authorimage mx-auto">
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
            style={{ width: "auto", height: "auto" }} // Maintain aspect ratio
            className="ml-2 rounded-full flex"
          />
          <span>{data.author}</span>
        </div>
        <div className="description text-lg flex flex-col gap-2">
          <p
            dangerouslySetInnerHTML={{ __html: data.description }}
            className="blog-description"
          >
            {/* {data.description} */}
          </p>
        </div>
      </div>

      {/* Right Side: Recent Posts Title */}
      <div className="w-[35%] p-4 ">
        <h2 className="font-bold text-2xl text-center">Recent Posts</h2>
        {recentPosts.reverse().slice(0, 6).map((post) => (
          <div
            className="px-4 py-2 dark:border dark:hover:bg-[#1b1b1b] hover:bg-[#c7c7c787] transition-colors duration-200   mt-2 rounded-xl cursor-pointer shadow-xl"
            key={post._id}
          >
            <Link  href={`/blog/${post._id}`} className="flex  dark:hover:bg-[#1b1b1b] transition-all">
              <h2>{post.title}</h2>
              <Image src={post.blogImage} width={100} height={100} alt="" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogData;
