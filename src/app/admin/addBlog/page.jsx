"use client";
import axios from "axios";
import Image from "next/image";
import React, { useState, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddBlog = () => {
  const [blogImage, setBlogImage] = useState(null);
  const [data, setData] = useState({
    title: "",
    description: "",
    postCategory: "App Development",
    author: "John Doe",
    authorImage: "John Doe",
  });

  const fileInputRef = useRef(null); // Create a ref for the file input

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("postCategory", data.postCategory);
    formData.append("author", data.author);
    formData.append("authorImage", data.authorImage);
    formData.append("blogImage", blogImage);

    try {
      const response = await axios.post("/api/blog", formData);
      if (response.data.success) {
        setBlogImage(null); // Reset the blog image state
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Reset the file input
        }
        toast.success(response.data.msg);
        setData({
          title: "",
          description: "",
          postCategory: "App Development",
          author: "John Doe",
          authorImage: "/author1.png",
        });
      } else {
        toast.error("Error: " + response.data.msg);
      }
    } catch (error) {
      toast.error(
        "An error occurred: " + (error.response?.data?.msg || error.message)
      );
    }
  };

  return (
    <div className="m-10">
      <ToastContainer theme="dark" autoClose={1000} />
      <form className="flex flex-col gap-8" onSubmit={submitHandler}>
        <div>
          <p className="text-2xl font-bold">Blog Title</p>
          <input
            value={data.title}
            name="title"
            onChange={onChangeHandler}
            type="text"
            placeholder="Add Your Title..."
            className="py-2 px-4 border-2 border-slate-300 w-[500px]"
          />
        </div>
        <div>
          <p className="text-2xl font-bold">Blog Content</p>
          <textarea
            value={data.description}
            name="description"
            onChange={onChangeHandler}
            placeholder="Add Your Content..."
            className="py-2 px-4 border-2 border-slate-300 w-[500px]"
            rows={8}
          />
        </div>
        <div>
          <p className="text-2xl font-bold">Upload Blog Image</p>
          <label htmlFor="blogImage" className="cursor-pointer">
            <Image
              className="mt-4 object-cover object-center w-24 invert  border-4 border-gray-400"
              width={270}
              height={70}
              alt="Upload Area"
              src={
                blogImage ? URL.createObjectURL(blogImage) : "/upload_area.png"
              }
            />
            <input
              ref={fileInputRef}
              onChange={(e) => setBlogImage(e.target.files[0])}
              type="file"
              id="blogImage"
              className="hidden"
            />
          </label>
        </div>
        <div className="flex flex-col gap-4 *:dark:bg-[#0F0F0F] dark:text-[#eee]">
          <p className="text-2xl font-bold">Select Category</p>
          <select
            value={data.postCategory}
            onChange={onChangeHandler}
            name="postCategory"
            className="w-60 px-4 py-4 border-2 border-gray-300 text-gray-500 font-[600]"
          >
            <option value="Web Development">Web Development</option>
            <option value="App Development">App Development</option>
            <option value="UI-UX">UI-UX</option>
          </select>
        </div>
        <div className="flex flex-col gap-4 *:dark:bg-[#0F0F0F] text-[#eee]">
          <p className="text-2xl font-bold">Select Blog Author </p>
          <select
            value={data.author}
            onChange={onChangeHandler}
            name="author"
            className="w-60 px-4 py-4 border-2 border-gray-300 text-gray-500 font-[600]"
          >
            <option value=">John Doe">John Doe</option>
            <option value="Mr.Smith">Mr.Smith</option>
            <option value="Helena Lim">Helena Lim</option>
          </select>
        </div>

        <button className="bg-blue-200 py-2 px-4 rounded-sm" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
