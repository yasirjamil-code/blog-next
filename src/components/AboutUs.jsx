import Image from "next/image";
import React from "react";

const AboutUs = () => {
  return (
    <div className="my-6 px-3 sm:px-4 lg:px-10">
      <h1 className="text-4xl font-semibold text-center ">About Us</h1>
      <hr className="w-1/2 my-2 mx-auto" />
      <div className="flex gap-2 flex-col lg:flex-row">
        <div className="image  flex-1">
          <Image
            src={"/imageAbout.jpg"}
            width={650}
            height={420}
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
        <div className="content border-[1px] border-gray-400 p-2 flex-1">
          <h2 className=" font-semibold text-2xl my-4">Our Vision</h2>
          <p className=" text-gray-700 font-light dark:text-[#eee]">
            We are a dynamic software development company dedicated to
            delivering cutting-edge solutions. Our team of talented
            professionals is committed to transforming ideas into robust and
            innovative software products. From startups to enterprises, we offer
            tailored solutions that drive growth and success in the digital
            world.
          </p>
          <h2 className=" font-semibold text-2xl my-4">What We Do</h2>
          <p className=" text-gray-700 font-light dark:text-[#eee]">
            At Our Company, we specialize in custom software
            development, web and mobile applications, and cloud solutions. Our
            expertise spans across various industries, enabling us to craft
            solutions that are not only scalable but also future-ready. We focus
            on quality, agility, and customer satisfaction to ensure our clients
            thrive in the competitive market.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
