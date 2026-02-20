import { Tooltip } from "@mui/joy";
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";
import ToggleSwitch from "../../Reusables/Elements/ToggleSwitch";

const UserRow = ({ user }) => {
  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 overflow-hidden">
        <td className="px-6 py-4 ">
          <div className="p-2">
            <p className="text-[12px] font-[600]">{user?.UUID}</p>
          </div>
        </td>

        <td className="px-6 py-4 whitespace-nowrap">{user?.username}</td>
        <td className="px-6 py-4 whitespace-nowrap">{user?.email}</td>
        <td className="px-6 py-4 whitespace-nowrap">{user?.phoneNumber}</td>
         <td className="px-6 py-4 whitespace-nowrap">
          <ToggleSwitch />
        </td>
        <td className="px-6 py-4 whitespace-nowrap">{user?.createdAt}</td>
        <td className="px-6 py-4 whitespace-nowrap">{user?.modifiedAt}</td>

       

        {/* <td className="px-6 py-4 whitespace-nowrap">
          <div>
            <p>
              {category?.createdAt?.toLocaleString("default", {
                month: "long",
              }) +
                " " +
                category?.createdAt?.getDate() +
                ", " +
                category?.createdAt?.getFullYear()}
            </p>
            <p>
              {category?.createdAt?.toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div>
            <p>
              {category?.modifiedAt?.toLocaleString("default", {
                month: "long",
              }) +
                " " +
                category?.modifiedAt?.getDate() +
                ", " +
                category?.modifiedAt?.getFullYear()}
            </p>
            <p>
              {category?.modifiedAt?.toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </div>
        </td> */}

        <td className="px-6 py-4">
          <div className="flex gap-1">
            <Tooltip title="Edit User">
              <button className="custom-btn custom-border">
                <MdModeEditOutline className="text-lg" />
              </button>
            </Tooltip>
            <Tooltip title="Delete User">
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

export default UserRow;
