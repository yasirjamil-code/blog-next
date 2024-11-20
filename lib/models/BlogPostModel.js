import mongoose from "mongoose";

const BlogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    postCategory: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    authorImage: {
      type: String,
      required: true,
    },
    blogImage: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } 
);

const BlogPostModel =
  mongoose.models.BlogPost || mongoose.model("BlogPost", BlogPostSchema);

export default BlogPostModel;
