"use client";
import axios from "axios";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddService = () => {
  const [serviceImage, setServiceImage] = useState(null);
  const fileInputRef = useRef(null);
  const [data, setData] = useState({
    title: "",
    serviceCategory: "App Development",
    serviceDeveloper: "John Doe",
    serviceImage: "",
    servicePrice: "",
    serviceDescription: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("serviceDeveloper", data.serviceDeveloper);
    formData.append("serviceImage", serviceImage);
    formData.append("serviceCategory", data.serviceCategory);
    formData.append("serviceDescription", data.serviceDescription);
    formData.append("servicePrice", Number(data.servicePrice)); // Convert to number

    const response = await axios.post("/api/services", formData);
    if (response.data.success) {
      setServiceImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setData({
        title: "",
        serviceCategory: "App Development",
        serviceDeveloper: "John Doe",
        servicePrice: "",
        serviceDescription: "",
      });
      toast.success(response.data.msg);
    }
  };

  return (
    <div className="m-10">
      <ToastContainer autoClose={1000} theme="light" />
      <form
        className="flex flex-col gap-8"
        onSubmit={onSubmitHandler}
      >
        {/* Service Title */}
        <div>
          <p className="text-2xl font-bold">Service Title</p>
          <input
            value={data.title}
            name="title"
            onChange={onChangeHandler}
            type="text"
            placeholder="Add Your Title..."
            className="py-2 px-4 border-[1.5px] border-slate-600 w-[500px]"
          />
        </div>

        {/* Service Description */}
        <div>
          <p className="text-2xl font-bold">Service Description</p>
          <input
            value={data.serviceDescription}
            name="serviceDescription"
            onChange={onChangeHandler}
            type="text"
            placeholder="Add Your Description..."
            className="py-2 px-4 border-[1.5px] border-slate-600 w-[500px]"
          />
        </div>

        {/* Service Category */}
        <div className="flex flex-col gap-4">
          <p className="text-2xl font-bold">Service Category</p>
          <select
            value={data.serviceCategory}
            onChange={onChangeHandler}
            name="serviceCategory"
            className="w-60 px-4 py-4 border-[1.5px] border-gray-600 text-gray-500 font-[600]"
          >
            <option value="Web Development">Web Development</option>
            <option value="App Development">App Development</option>
            <option value="Database Management">Database Management</option>
            <option value="Cyber Security">Cyber Security</option>
            <option value="UI-UX">UI-UX</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="SEO">SEO</option>
            <option value="Content Writing">Content Writing</option>
          </select>
        </div>

        {/* Service Developer */}
        <div className="flex flex-col gap-4">
          <p className="text-2xl font-bold">Service Developer</p>
          <select
            value={data.serviceDeveloper}
            onChange={onChangeHandler}
            name="serviceDeveloper"
            className="w-60 px-4 py-4 border-[1.5px] border-gray-600 text-gray-500 font-[600]"
          >
            <option value="John Doe">John Doe</option>
            <option value="Mr.Smith">Mr.Smith</option>
            <option value="Helena Lim">Helena Lim</option>
          </select>
        </div>

        {/* Service Price */}
        <div className="flex flex-col gap-4">
          <p className="text-2xl font-bold">Service Price $/hr</p>
          <input
            value={data.servicePrice}
            onChange={onChangeHandler}
            type="number"
            name="servicePrice"
            className="py-2 px-4 border-[1.5px] border-slate-600 w-40"
            placeholder="Enter Price"
          />
        </div>

        {/* Upload Service Image */}
        <div>
          <p className="text-2xl font-bold">Upload Service Image</p>
          <label htmlFor="serviceImage" className="cursor-pointer">
            <Image
              className="mt-4 object-cover object-center w-24"
              width={270}
              height={70}
              alt="Upload Area"
              src={
                serviceImage
                  ? URL.createObjectURL(serviceImage)
                  : "/upload_area.png"
              }
            />
            <input
              ref={fileInputRef}
              onChange={(e) => {
                const file = e.target.files[0];
                setServiceImage(file);
              }}
              type="file"
              id="serviceImage"
              className="hidden"
            />
          </label>
        </div>

        <button className="bg-blue-200 py-2 px-4 rounded-sm" type="submit">
          Add Service
        </button>
      </form>
    </div>
  );
};

export default AddService;
