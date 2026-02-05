import { Tooltip } from "@mui/joy";
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";
import ToggleSwitch from "../../Reusables/Elements/ToggleSwitch";
import { getFixedDateAndTimeString } from "../../../utilities/getDateAndTime";

const CategoryRow = ({ category }) => {
  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 overflow-hidden">
        <td className="px-6 py-4 border border-gray-400">
          <div className="w-[150px]">
            <img
              loading="lazy"
              src={category?.image?.url}
              className="w-40 h-auto rounded-xl  object-cover"
              alt=""
            />
          </div>
        </td>
        <td className="px-6 py-4 border border-gray-400 ">
          <div className="p-2">
            <p className="text-[12px] font-[600] capitalize">
              {category?.name}
            </p>
          </div>
        </td>
        {/* <td className="px-6 py-4 whitespace-nowrap">{category?.products}</td> */}
        {/* <td className="px-6 py-4 whitespace-nowrap border border-r-gray-400">
          {category?.level2?.name}
        </td>
        <td className="px-6 py-4 whitespace-nowrap border border-r-gray-400">
          {category?.level3?.name}
        </td> */}
        <td className="px-6 py-4 whitespace-nowrap border border-gray-400">
          <ToggleSwitch defaultChecked={category.isActive} />
        </td>
        <td className="px-6 py-4 whitespace-nowrap  border border-gray-400">
          {getFixedDateAndTimeString(category?.createdAt)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap border border-gray-400">
          {getFixedDateAndTimeString(category?.updatedAt)}
        </td>

        <td className="px-6 py-4 border border-gray-400">
          <div className="flex gap-1">
            <Tooltip title="View Category">
              <button className="custom-btn custom-border">
                <IoEyeOutline className="text-lg" />
              </button>
            </Tooltip>
            <Tooltip title="Edit Category">
              <button className="custom-btn custom-border">
                <MdModeEditOutline className="text-lg" />
              </button>
            </Tooltip>
            <Tooltip title="Delete Category">
              <button className="custom-btn custom-border">
                <MdDeleteOutline className="text-lg" />
              </button>
            </Tooltip>
          </div>
        </td>
      </tr>
    </>
  );
};

export default CategoryRow;
