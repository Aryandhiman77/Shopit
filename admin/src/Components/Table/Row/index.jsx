import { Tooltip } from "@mui/joy";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";
import CollapsablePanel from "../../Reusables/CollapsablePanel";

const Row = ({order}) => {
  return (
    
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 overflow-hidden">
      <td className="px-4 py-4 w-10">
        <button className="custom-btn !rounded-full custom-border !p-1">
          <IoIosArrowDown className="text-2xl" />
        </button>
      </td>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
       {order?.orderId}
      </th>

      <td className="px-6 py-4">{order?.paymentId}</td>
      <td className="px-6 py-4">{order?.username}</td>
      <td className="px-6 py-4">{order?.phoneNumber}</td>
      <td className="px-6 py-4">{order?.items?.length}</td>
      <td className="px-6 py-4">{order?.price}</td>
      <td className="px-6 py-4">{order?.createdAt}</td>
      <td className="px-6 py-4">{order?.modifiedAt}</td>
      <td className="px-6 py-4">{order?.status}</td>
     
      <td className="px-6 py-4 flex items-center gap-1">
        <Tooltip title="View Product">
          <button className="custom-btn custom-border">
            <IoEyeOutline className="text-lg" />
          </button>
        </Tooltip>
        <Tooltip title="Edit Product">
          <button className="custom-btn custom-border">
            <MdModeEditOutline className="text-lg" />
          </button>
        </Tooltip>
        <Tooltip title="Delete Product">
          <button className="custom-btn custom-border">
            <MdDeleteOutline className="text-lg" />
          </button>
        </Tooltip>
      </td>
    </tr>
  );
};

export default Row;
