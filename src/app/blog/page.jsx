"use client";
import Loading from "@/components/Loading";
import SingleBlogs from "@/components/SingleBlogs";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Page = () => {
  const options = ["All", "Web Development", "App Development", "UI-UX"];
  const [menu, setMenu] = useState("All");
  const [blog, setBlog] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true); // Start with loading true

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blog");
      if (response.data.blogs) {
        setBlog(response.data.blogs);
      } else {
        console.warn("No blogs found");
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredBlogs = blog
    .filter((item) =>
      menu === "All"
        ? true
        : item.postCategory.toLowerCase() === menu.toLowerCase()
    )
    .filter((post) =>
      post.title.toLowerCase().includes(searchValue.toLowerCase())
    );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  // Render loading state or main content
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Category Filter */}
      <div className="flex gap-4 justify-center mt-8 text-center">
        {options.map((item, index) => (
          <button
            onClick={() => setMenu(item)}
            className={`${
              menu === item
                ? "bg-[#1d1d1d] px-3 py-1 border-2 border-black text-white"
                : "px-2 py-1 border-2 border-gray-700"
            } text-sm md:text-base transition-all duration-300 rounded-md`}
            key={index}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <form
        onSubmit={handleSearchSubmit}
        className="text-center my-8 max-w-[500px] mx-auto"
      >
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          placeholder="Search for blog..."
          className="border-2 border-gray-400 px-4 py-2 w-full sm:w-[400px] lg:w-[500px] outline-none rounded-md"
        />
        <button
          type="submit"
          className="bg-black px-4 py-2 ml-4 text-white rounded-md sm:hidden md:inline-block"
        >
          Search
        </button>
      </form>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredBlogs.map((item) => {
          const { _id, title, blogImage, description, author, postCategory, date } = item;
          return (
            <SingleBlogs
              key={_id}
              id={_id}
              title={title}
              description={description}
              blogImage={blogImage}
              author={author}
              category={postCategory}
              date={date}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Page;
