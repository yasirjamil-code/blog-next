"use client";
import TableFile from "@/components/AdminComponents/TableFile";
import axios from "axios";
import React, { useEffect, useState } from "react";

const BlogData = () => {
  const [blog, setBlog] = useState([]);

  const deleteBlog = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blogpost?"
    );
    if (!confirmed) return; // Exit if not confirmed
    await axios.delete("/api/blog", {
      params: { id: id },
    });
    // Update state to remove the deleted blog
    setBlog((prev) => prev.filter((post) => post._id !== id));
  };

  const fetchBlogs = async (id) => {
    try {
      const response = await axios.get("/api/blog");
      if (response.data.blogs) {
        setBlog(response.data.blogs);
        console.log(response.data.blogs);
      } else {
        console.warn("No blogs found");
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <table className="w-full border-collapse mx-2 dark:text-black">
      <thead>
        <tr className="bg-gray-400">
          <th className="w-14 px-2 py-2">Posts</th>
          <th className="px-2 py-2">Title</th>
          <th className="w-36 px-2 py-2">Author</th>
          <th className="w-36 px-2 py-2">Date</th>
          <th className="w-36 px-2 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {blog.map((post, index) => (
          <TableFile
            key={index}
            id={post._id}
            title={post.title}
            index={index}
            author={post.author}
            date={post.date}
            deleteBlog={deleteBlog}
          />
        ))}
      </tbody>
    </table>
  );
};

export default BlogData;
