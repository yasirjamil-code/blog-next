"use client";
import TableFile from "@/components/AdminComponents/TableFile";
import Loading from "@/components/Loading";
import ServicesTable from "@/components/ServicesTable";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BlogData = () => {
  const [Services, setServices] = useState([]);

  if (!Services) {
    return <Loading/>
  }

  const fetchServices = async () => {
    const response = await axios.get("/api/services");
    setServices(response.data.services);
  };
  const deleteService = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this service?");
    if (!confirmed) return; // Exit if not confirmed
  
    const response = await axios.delete("/api/services", {
      params: { id: id },
    });
    if (response.data.success) {
      setServices((prev) => prev.filter((service) => service._id !== id));
      toast.success(response.data.msg);
    } else {
      toast.error("Getting Error");
    }
  };
  
  

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <table className="w-full border-collapse mx-2 dark:text-black dark:bg-current">
      <ToastContainer theme="dark" autoClose={1000} />
      <thead>
        <tr className="bg-gray-400">
          <th className="w-14 px-2 py-2">Services</th>
          <th className="px-2 py-2">Title</th>
          <th className="w-40 px-2 py-2">Developer</th>
          <th className="w-36 px-2 py-2">Date</th>
          <th className="w-36 px-2 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {Services.map((service, index) => (
          <ServicesTable
            key={service._id}
            id={service._id}
            title={service.title}
            index={index}
            developer={service.developer}
            date={service.date}
            deleteService={deleteService}
          />
        ))}
      </tbody>
    </table>
  );
};

export default BlogData;
