const EmailTable = ({ id, email, index, deleteEmail, date }) => { // Fixed the spelling of EmailTable
  return (
    <tr className="border-b *:py-3">
      <td className="text-center px-2 py-2 bg-red-300 dark:bg-red-950 dark:text-white">{index + 1}</td>
      <td className="text-left px-2 py-2 bg-blue-200 dark:bg-blue-950 dark:text-white">{email}</td>
      <td className="text-center px-2 bg-green-200 dark:bg-green-950 dark:text-white py-2">
        {new Date(date).toLocaleDateString()}
      </td>
      <td className="text-center bg-indigo-200 px-2 py-2 dark:bg-orange-950 dark:text-white">
        <button
          onClick={() => deleteEmail(id)} // Pass the id correctly
          className="text-red-600 px-1 ml-2 bg-gray-200 hover:scale-110 transition-all !bg-transparent dark:text-gray-200 !border-none  hover:underline"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default EmailTable; // Fix the spelling of EmailTable
