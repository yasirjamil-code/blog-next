"use client";
import Loading from "@/components/Loading";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Page = ({ params }) => {
  const [data, setData] = useState(null);

  const fetchServiceData = async () => {
    const response = await axios.get("/api/services", {
      params: { id: params.id },
    });
    setData(response.data.service);
  };

  useEffect(() => {
    fetchServiceData();
  }, []);

  if (!data) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-4">{data.title}</h1>
      
      {/* Main container with responsive layout */}
      <div className="flex flex-col dark:bg-[#0c0c0c] *:text-[#eee]  sm:flex-row gap-4 justify-between h-auto sm:h-[60vh] rounded-lg border-[1.5px] border-gray-800 bg-gray-200 p-4 items-center">
        
        {/* Image container */}
        <div className="w-full sm:w-[30vw] h-[200px] sm:h-auto relative overflow-hidden mb-4 sm:mb-0">
          <Image
            src={data.serviceImage}
            alt={data.service}
            layout="fill"
            objectFit="cover"
            className="object-cover rounded-lg"
          />
        </div>

        {/* Text and Details section */}
        <div className="flex flex-col items-center sm:items-start ">
          {/* Developer info */}
          <div className="authorimage flex items-center justify-center sm:justify-start mb-4">
            <Image
              src={
                data.developer === "John Doe"
                  ? "/author-img/john.png"
                  : data.developer === "Helena Lim"
                  ? "/author-img/helena.png"
                  : data.developer === "Mr.Smith"
                  ? "/author-img/smith.png"
                  : "/icon.png"
              }
              alt="Author"
              width={50}
              height={50}
              className="rounded-full mr-2"
            />
            <div>
              <h3 className="text-lg font-medium">{data.developer}</h3>
              <p className="text-sm text-gray-500">"{data.serviceCategory} Expert"</p>
            </div>
          </div>

          {/* Description */}
          <div className="description text-lg text-center sm:text-left">
            <p className="mb-4 dark:text-[#eee]0">{data.serviceDescription}</p>
            <p className="font-bold">
              Average Price:{" "}
              <span className="text-green-600">${data.servicePrice}/Hour</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
