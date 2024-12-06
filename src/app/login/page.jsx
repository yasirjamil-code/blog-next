"use client";
import Loading from "@/components/Loading";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LoginSignup = () => {
  const router = useRouter();
  const { data:session, status } = useSession();

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
          {"Login"}
        </h2>
       
        <div className="flex flex-col mt-1 space-y-4 dark:*:text-white">
          <button
            onClick={() => signIn("google")}
            className="flex items-center justify-center w-full p-2 text-black rounded-md hover:bg-gray-100 shadow-md transition-all"
          >
            <Image src={"/google.png"} height={30} width={30} alt="" className="mx-4" /> 
            Continue  with Google
          </button>
          <button
            onClick={() => signIn("github")}
            className="flex items-center justify-center w-full p-2 text-black rounded-md hover:bg-gray-100 shadow-md transition-all"
          >
            <Image src={"/github.png"} height={30} width={30} alt="" className="mx-4" /> 
            Continue with Github
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
