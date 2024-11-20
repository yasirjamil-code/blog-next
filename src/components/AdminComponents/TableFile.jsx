import React from "react";
import { useRouter } from "next/navigation";

const TableFile = ({ key, id, title, index, author, date, deleteBlog }) => {
  const router = useRouter();

  return (
    <tr key={index} className="border-b">
      <td className="text-center px-2 py-2 bg-red-300">{index + 1}</td>

      <td className="text-left px-2 py-2 bg-blue-200">{title} . </td>

      <td className="text-center px-2 py-2 bg-gray-200">{author}</td>
      <td className="text-center px-2 bg-green-200 py-2">
        {" "}
        {new Date(date).toLocaleDateString()}
      </td>
      <td className="text-center px-2 py-2">
        
        <button
          onClick={() => deleteBlog(id)}
          className="text-red-600 px-1 ml-2 hover:bg-gray-200 dark:bg-gray-200 dark:text-red-600 rounded-full"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TableFile;
