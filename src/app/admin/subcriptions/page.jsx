"use client";
import EmailTable from "@/components/AdminComponents/EamilTable";
import Loading from "@/components/Loading";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Subcriptions = () => {
  const [emails, setEmails] = useState([]);

  const fetchEmail = async () => {
    const response = await axios.get("/api/email");
    setEmails(response.data.emails);
  };

  if (!emails) {
    return <Loading />;
  }

  const deleteEmail = async (id) => {
    try {
      const response = await axios.delete("/api/email", {
        params: { id: id },
      });
      if (response.data.success) {
        setEmails((prev) => prev.filter((email) => email._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete email:", error);
    }
  };

  useEffect(() => {
    fetchEmail();
  }, []);

  return (
    <div className="border-2 border-gray-500 px-5 m-2">
      {/* Table with responsive scrolling */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse mt-2 mx-2 dark:text-black">
          <thead>
            <tr className="bg-gray-400">
              <th className="px-4 py-2 text-sm sm:text-base">Index</th>
              <th className="px-4 py-2 text-sm sm:text-base">Emails</th>
              <th className="px-4 py-2 text-sm sm:text-base">Date</th>
              <th className="px-4 py-2 text-sm sm:text-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            {emails.map((email, index) => (
              <EmailTable
                key={email._id}
                id={email._id}
                email={email.email}
                index={index}
                deleteEmail={deleteEmail}
                date={email.date}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Subcriptions;
