import Image from "next/image";
import Link from "next/link";
import React from "react";

const SingleCard = ({ id, title, developer, serviceImage }) => {
  return (
    <div className="w-full sm:w-[350px] lg:w-[380px] hover:bg-blue-100 dark:hover:bg-[#2b2a2a] transition-all p-4 mt-8">
      <div className="bg-white shadow-lg flex flex-col items-center dark:border rounded-lg overflow-hidden dark:bg-[#0f0f0f] dark:text-[#eee]">
        <Link href={`/services/${id}`} className="w-full">
          <Image
            src={serviceImage}
            alt={title}
            className="w-full h-48 object-cover rounded-md mt-5"
            height={192}
            width={300}
            layout="responsive"  // Ensures the image is responsive
          />
        </Link>
        <div className="mt-4 p-4 w-full flex flex-col items-center gap-4">
          <h3
            className="text-lg font-medium max-w-[320px] text-center sm:text-left"
            style={{ wordSpacing: "0.1rem" }}
          >
            {title.length > 40 ? title.slice(0, 40) + "..." : title}
          </h3>
          <div className="flex justify-between w-full px-4 mt-2">
            <div className="flex items-center border-[1px] px-2 py-1 rounded">
              <Image
                className="rounded-full"
                src={
                  developer === "John Doe"
                    ? "/author-img/john.png"
                    : developer === "Helena Lim"
                    ? "/author-img/helena.png"
                    : developer === "Mr.Smith"
                    ? "/author-img/smith.png"
                    : "/icon.png"
                }
                alt={""}
                width={40}
                height={40}
              />
              <span className="ml-2 text-gray-600">{developer}</span>
            </div>
            <Link href={`/services/${id}`}>
              <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2 sm:mt-0">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
