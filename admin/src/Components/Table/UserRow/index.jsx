import { Tooltip } from "@mui/joy";
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";
import CustomToggle from "../../Reusables/Elements/CustomToggle";
import { getFixedDateAndTimeString } from "../../../utilities/getDateAndTime";

const UserRow = ({ user }) => {
  return (
    <>
      <tr
        className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 overflow-hidden ${user.role === "admin" && "bg-[#efecfb]! font-bold!"}`}
      >
        <td className="px-6 py-4 ">
          <div className="p-2">
            <p className="text-[12px] font-[600]">{user?.UUID}</p>
          </div>
        </td>

        <td className="px-6 py-4 whitespace-nowrap">{user?.name}</td>
        <td className="px-6 py-4 whitespace-nowrap">{user?.email}</td>
        <td className="px-6 py-4 whitespace-nowrap">{user?.phoneNumber}</td>
        <td className="px-6 py-4 whitespace-nowrap">{user?.role}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <CustomToggle checked={user?.accountStatus === "active"} />
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex justify-center items-center">
            <CustomToggle checked={user?.verifiedEmail} />
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex justify-center items-center">
            <CustomToggle checked={user?.verifiedNumber} />
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {getFixedDateAndTimeString(user?.createdAt)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {getFixedDateAndTimeString(user?.updatedAt)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap  text-center">
          {user?.loggedInUserCount}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-center">
          {user?.loginAttempts}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-center">
          {user?.suspensionCount}
        </td>
        <td className="px-6 py-4 whitespace-nowrap  text-center">
          {user?.suspensionExpires > 0
            ? getFixedDateAndTimeString(user?.suspensionExpires)
            : "-"}
        </td>
      </tr>
    </>
  );
};

export default UserRow;
