"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Admin = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("http://localhost:3000/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>; // Optional: Show a loading state while checking auth status
  }

  return <div>Admin</div>;
};

export default Admin;
