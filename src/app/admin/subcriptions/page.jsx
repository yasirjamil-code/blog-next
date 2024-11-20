"use client";
import EmailTable from "@/components/AdminComponents/EamilTable";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Subcriptions = () => {
  const [emails, setEmails] = useState([]);

  const fetchEmail = async () => {
    const response = await axios.get("/api/email");
    setEmails(response.data.emails);
  };

  const deleteEmail = async (id) => { // Accept id as a parameter
    try {
      const response = await axios.delete("/api/email", {
        params: { id: id },
      });
      if (response.data.success) { // Check if the deletion was successful
        setEmails((prev) => prev.filter((email) => email._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete email:", error); // Handle errors
    }
  };

  useEffect(() => {
    fetchEmail();
  }, []);

  return (
    <div className="border-2 border-gray-500 px-5 m-2">
      <table className="w-full border-collapse mt-2 mx-2 dark:text-black">
        <thead>
          <tr className="bg-gray-400">
            <th className="w-14 px-2 py-2">Index</th>
            <th className="w-[280px] px-2 py-2">Emails</th>
            <th className="w-36 px-2 py-2">Date</th>
            <th className="w-36 px-2 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {emails.map((email, index) => (
            <EmailTable // Fixed the spelling of EmailTable
              id={email._id}
              email={email.email}
              key={email._id} // Properly use the key prop
              index={index}
              deleteEmail={deleteEmail}
              date={email.date}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Subcriptions;
