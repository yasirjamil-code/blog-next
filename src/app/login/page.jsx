"use client";
import Loading from "@/components/Loading";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { data:session, status } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();              

    if (isLogin) {
      // Login logic with NextAuth's signIn
      const res = await signIn("credentials", { redirect: false, email, password });
      if (res && !res.error) {
        router.push("/"); // Redirect after successful login
      } else {
        alert("Login failed. Check your credentials.");
      }
    } else {
      // Signup logic
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        alert("Signup successful! You can now log in.");
        setIsLogin(true);
      } else {
        alert("Signup failed. Try again.");
      }
    }
  };

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "authenticated") {
    router.push("/");
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-[#0f0f0f] text-[#eee] dark:*:text-white">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md transition-all dark:bg-[#0f0f0f] text-[#eee] border">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-[#eee]">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6 dark:*:text-white ">
          <div className="dark:*:text-white dark:placeholder:text-white">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter Your Email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-1000"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-1000"
            />
          </div>
          <button type="submit" className="w-full p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="text-center">Or</p>
        <div className="flex flex-col mt-1 space-y-4 dark:*:text-white">
          <button
            onClick={() => signIn("google")}
            className="flex items-center justify-center w-full p-2 text-black rounded-md hover:bg-gray-100 shadow-md transition-all"
          >
            <Image src={"/google.png"} height={30} width={30} alt="" className="mx-4" /> 
            Sign in with Google
          </button>
          <button
            onClick={() => signIn("github")}
            className="flex items-center justify-center w-full p-2 text-black rounded-md hover:bg-gray-100 shadow-md transition-all"
          >
            <Image src={"/github.png"} height={30} width={30} alt="" className="mx-4" /> 
            Sign in with Github
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
