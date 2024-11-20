"use client";
import React, { useEffect, useState } from "react";
import SingleCard from "./SingleCard";
import axios from "axios";
import Loading from "./Loading";

const PaginationComponent = ({ cards }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => {
    // Prevent going to a page that doesn't exist
    if (pageNumber < 1 || pageNumber > Math.ceil(cards.length / cardsPerPage)) {
      return;
    }
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="cards flex gap-10 justify-evenly overflow-x-auto dark:bg-[#0f0f0f] dark:text-[#eee]">
        {currentCards.length > 0 ? (
          currentCards.map((item) => (
            <SingleCard
              key={item.id}
              id={item._id}
              title={item.title}
              serviceImage={item.serviceImage}
              developer={item.developer}
            />
          ))
        ) : (
          <Loading/> // Handle empty state
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

const OurServices = () => {
  const [Services, setServices] = useState([]);

  const fetchServices = async () => {
    try {
      const response = await axios.get("/api/services");
      setServices(response.data.services);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="px-10 my-4">
      <div>
        <div className="title">
          <h1 className="text-4xl font-semibold text-center">Our Services</h1>
        </div>
        <PaginationComponent cards={Services} />
      </div>
    </div>
  );
};

export default OurServices;
