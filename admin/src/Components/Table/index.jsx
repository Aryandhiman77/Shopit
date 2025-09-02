import { Tooltip } from "@mui/material";
import React from "react";
import { IoIosArrowDown, IoMdEye } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import {
  MdDelete,
  MdDeleteOutline,
  MdEdit,
  MdModeEditOutline,
} from "react-icons/md";
import Row from "./Row";

const Table = ({ attributes ,children}) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full max-w-full">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {attributes?.map((att, i) => (
              <th scope="col" className="px-6 py-3 whitespace-nowrap" key={i}>
                <span>{att}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
