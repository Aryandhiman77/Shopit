import "./style.css";
const Table = ({ attributes, children }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full max-w-full  ">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs uppercase bg-blue-500 text-white dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {attributes?.map((att, i) => (
              <th scope="col" className="px-6 py-3 whitespace-nowrap" key={i}>
                <span>{att}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
