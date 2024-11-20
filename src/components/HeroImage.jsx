"use client";
// font-bold dark:bg-gray-950 bg-blue-950
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";

const HeroImage = () => {
  const [email, setEmail] = useState("");
  const videoRef = useRef(null);

  function slowDownVideo() {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 0.5; // Slow down the video to 50% of the normal speed
    }
  }

  // Fade in/out effect when the video ends and restarts
  const handleVideoEnd = () => {
    const video = videoRef.current;
    if (video) {
      video.classList.add("opacity-0"); // Fade-out effect
      setTimeout(() => {
        video.currentTime = 0; // Reset video to start
        video.classList.remove("opacity-0"); // Fade-in effect
        video.play(); // Play the video from the start
      }, 500); // 500ms for fade-out transition time
    }
  };

  useEffect(() => {
    slowDownVideo();
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    const response = await axios.post("/api/email", formData);
    if (response.data.success) {
      toast.success("Email Subscribed");
      setEmail("");
    } else {
      toast.error("Getting Error");
    }
  };

  return (
    <div className="relative flex items-center justify-center h-[90vh] w-full mb-8">
      <video
        ref={videoRef}
        loop
        autoPlay
        muted
        onEnded={handleVideoEnd} // Handle when the video ends
        src="/hero.mp4"
        alt="Hero"
        className="w-full h-[90vh] object-cover opacity-95 transition-opacity duration-500" // Add fade transition
      ></video>

      <div className="absolute top-36 flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold py-2 px-5 rounded-full bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-yellow-300">
          Subscribe To Get Updates
        </h1>

        <form className="flex gap-2" onSubmit={onSubmitHandler}>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Subscribe Emails"
            type="email"
            className="font-medium border-2 border-blue-700 outline-none px-5 py-2 w-[300px] bg-transparent text-white"
          />
          <button
            type="submit"
            className="px-5 hover:text-gray-900 transition-all duration-300 py-2 bg-transparent border-2 border-blue-500 text-white rounded-lg hover:opacity-95 active:opacity-90"
          >
            Subcribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default HeroImage;
