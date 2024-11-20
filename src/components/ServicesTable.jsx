import React from "react";

const TableFile = ({
  key,
  id,
  title,
  index,
  developer,
  date,
  deleteService,
}) => {
  return (
    <tr key={index} className="border-b">
      <td className="text-center px-2 py-2 bg-red-300 dark:bg-red-950 dark:text-white">{index + 1}</td>

      <td className="text-left px-2 py-2 bg-blue-200 dark:bg-blue-950 dark:text-white">{title} . </td>

      <td className="text-center px-2 py-2 bg-gray-200 dark:bg-gray-950 text-white">{developer}</td>
      <td className="text-center px-2 bg-green-200 py-2 dark:bg-green-950 dark:text-white">
        {new Date(date).toLocaleDateString()}
      </td>
      <td className="text-center px-2 py-2 dark:bg-orange-950">
        <button
          onClick={() => deleteService(id)}
          className="text-red-600 px-1 ml-2 bg-gray-200 hover:scale-110 transition-all !bg-transparent dark:text-gray-200 !border-none  hover:underline"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TableFile;
