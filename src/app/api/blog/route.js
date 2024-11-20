import { NextResponse } from "next/server"; // Ensure this import if using Next.js
import BlogPostModel from "../../../../lib/models/BlogPostModel"; // Adjust the import based on your structure
import { ConnectDB } from "../../../../lib/config/database";
import { Buffer } from "buffer";
import { writeFile } from "fs/promises";
const fs = require("fs");
// Get Method for (Getting Blog)

export async function GET(request) {
  await ConnectDB();
  const blogId = request.nextUrl.searchParams.get("id");
  console.log(blogId);
  if (blogId) {
    const singleBlog = await BlogPostModel.findById(blogId);
    return NextResponse.json({ singleBlog });
  } else {
    const blogs = await BlogPostModel.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ blogs });
  }
}

export async function POST(request) {
  try {
    await ConnectDB();
    const formData = await request.formData();

    const timeStamp = Date.now();
    const blogImage = formData.get("blogImage"); // Use correct field name
    const blogImageByteData = await blogImage.arrayBuffer();
    const buffer = Buffer.from(blogImageByteData);
    const path = `./public/${timeStamp}_${blogImage.name}`;
    await writeFile(path, buffer);

    const blogImageUrl = `/${timeStamp}_${blogImage.name}`;

    const blogData = {
      title: formData.get("title") || "",
      description: formData.get("description") || "",
      postCategory: formData.get("postCategory") || "",
      author: formData.get("author") || "",
      authorImage: formData.get("authorImage") || "",
      blogImage: blogImageUrl,
    };

    await BlogPostModel.create(blogData);
    return NextResponse.json({ success: true, msg: "Blog added" });
  } catch (error) {
    return NextResponse.json({
      success: false,
      msg: "Error saving blog data: " + (error.message || "Unknown error"),
    });
  }
}

export async function DELETE(request) {
  const id = await request.nextUrl.searchParams.get("id");
  const blog = await BlogPostModel.findById(id);
  try {
    fs.unlinkSync(`/public/${blog.blogImage}`);
  } catch (err) {
    console.error("Error deleting file:", err);
  }

  await BlogPostModel.findByIdAndDelete(id); // Correct usage

  return NextResponse.json({ success: true, msg: "Blog Deleted" });
}

export async function PUT(request) {
  await ConnectDB();

  const id = request.nextUrl.searchParams.get("id");
  const formData = await request.formData();

  // Check if the formData is being received correctly
  console.log([...formData.entries()]);

  try {
    const blogData = {
      title: formData.get("title") || "",
      description: formData.get("description") || "",
      postCategory: formData.get("postCategory") || "",
      author: formData.get("author") || "",
      authorImage: formData.get("authorImage") || "",
      // Handle blogImage upload if necessary
      blogImage: formData.get("blogImage") || "", // Optional based on your logic
    };

    const updatedBlog = await BlogPostModel.findByIdAndUpdate(id, blogData, { new: true });

    if (!updatedBlog) {
      return NextResponse.json({ success: false, msg: "Blog not found" });
    }

    return NextResponse.json({ success: true, msg: "Blog updated successfully", updatedBlog });
  } catch (error) {
    console.error("Error updating blog data:", error);
    return NextResponse.json({
      success: false,
      msg: "Error updating blog data: " + (error.message || "Unknown error"),
    });
  }
}






