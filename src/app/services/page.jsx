"use client";
import Loading from "@/components/Loading";
import SingleCard from "@/components/SingleCard";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Services = () => {
  const [loading, setLoading] = useState(true);
  const [Services, setServices] = useState([]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/services");
      setServices(response.data.services);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

 

  useEffect(() => {
    fetchServices();
  }, []);

  if (loading) {
    return <Loading/>
  }

  return (
    <div className="flex flex-wrap justify-evenly">
      {Services.map((service, index) => {
        const { title, serviceCategory, serviceImage, _id, developer } =
          service;
        return (
          <SingleCard
            title={title}
            key={_id}
            id={_id}
            serviceCategory={serviceCategory}
            developer={developer}
            serviceImage={serviceImage}
          />
        );
      })}
    </div>
  );
};

export default Services;
