import React from "react";
import { useRouter } from "next/navigation";

const TableFile = ({ id, title, index, author, date, deleteBlog }) => {
  const router = useRouter();

  return (
    <tr key={index} className="border-b sm:flex sm:flex-col sm:gap-2 sm:items-start lg:flex-row">
      <td className="text-center px-2 py-2 sm:w-full sm:text-left sm:px-0 bg-red-300 dark:bg-red-950 dark:text-[#eee]">
        {index + 1}
      </td>

      <td className="text-left px-2 py-2 sm:w-full sm:px-0 bg-blue-200 dark:bg-blue-950 dark:text-white">
        {title}{" "}
      </td>

      <td className="text-center px-2 py-2 sm:w-full sm:text-left sm:px-0 bg-gray-200 dark:bg-gray-950 dark:text-white">
        {author}
      </td>

      <td className="text-center px-2 py-2 sm:w-full sm:text-left sm:px-0 bg-green-200 dark:bg-green-950 dark:text-white">
        {new Date(date).toLocaleDateString()}
      </td>

      <td className="text-center px-2 py-2 sm:w-full sm:text-left sm:px-0 dark:bg-orange-950 dark:text-white">
        <button
          onClick={() => deleteBlog(id)}
          className="text-red-600 px-1 ml-2 bg-gray-200 hover:scale-110 transition-all !bg-transparent dark:text-gray-200 !border-none  hover:underline"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TableFile;
