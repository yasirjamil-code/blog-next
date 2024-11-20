"use client";
import AboutUs from "@/components/AboutUs";
import HeroImage from "@/components/HeroImage";
import OurBlogs from "@/components/OurBlogs";
import OurServices from "@/components/OurServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Home() {
  return (
    <div className="min-w-full">
      <ToastContainer theme="dark" autoClose={1000} />
      <HeroImage />
      <AboutUs />
      <OurServices />
      <OurBlogs />
    </div>
  );
}
