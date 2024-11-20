"use client";
import React, { useEffect, useState } from "react";
import SingleBlogs from "./SingleBlogs";
import axios from "axios"; // Ensure axios is imported
import Loading from "./Loading";

const PaginationComponent = ({ cards }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > Math.ceil(cards.length / cardsPerPage)) {
      return;
    }
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="cards flex gap-10 justify-evenly overflow-x-auto dark:bg-[#0f0f0f] text-[#eee]">
        {currentCards.length > 0 ? (
          currentCards.map((item) => (
            <SingleBlogs
              key={item._id}
              id={item._id}
              title={item.title}
              blogImage={item.blogImage}
              author={item.author}
              category={item.postCategory}
            />
          ))
        ) : (
          <Loading/>
        )}
      </div>

      <div className="pagination flex justify-center items-center gap-4 mt-2">
        {[...Array(Math.ceil(cards.length / cardsPerPage)).keys()].map(
          (number) => (
            <button
              className={`pagination-button ${
                currentPage === number + 1
                  ? "bg-blue-500 text-white px-3 py-1 border-2 border-blue-500"
                  : "border-2 border-blue-500 px-3 py-1"
              }`}
              key={number}
              onClick={() => paginate(number + 1)}
            >
              {number + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

const OurBlogs = () => {
  const [blog, setBlog] = useState([]);

  const fetchBlogs = async () => {
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
    <div className="px-10 my-4">
      <div>
        <div className="title">
          <h1 className="text-4xl font-semibold text-center">Our Blogs</h1>
        </div>
        <PaginationComponent cards={blog} />
      </div>
    </div>
  );
};

export default OurBlogs;
