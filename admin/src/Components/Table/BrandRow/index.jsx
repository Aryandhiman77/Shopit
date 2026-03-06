import { Tooltip } from "@mui/material";
import React from "react";
import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";
import CustomToggle from "../../Reusables/Elements/CustomToggle";
import { getFixedDateAndTimeString } from "../../../utilities/getDateAndTime";

const BrandRow = ({ brand, index, handleEdit }) => {
  const handleStatusChange = (id) => {
    console.log(id);
  };
  return (
    <>
      <tr
        className={`border "border-2 border-b-0 bg-amber-50" dark:bg-gray-900 dark:border-gray-400! border-gray-500`}
      >
        <td className="px-4 py-4  text-center font-semibold text-black">
          #{brand._id.slice(19)}
        </td>
        <td className="px-6 py-4 border border-gray-400">
          <img
            loading="lazy"
            src={brand?.logo?.url}
            className="w-15 h-auto rounded-xl  object-contain"
            alt=""
          />
        </td>
        <td className="px-6 py-4 border border-gray-400 ">
          <div className="p-2">
            <p className="text-[12px] font-[600] capitalize">{brand?.name}</p>
          </div>
        </td>
        {/* <td className="px-6 py-4 border border-gray-400 ">
          <div className="p-2 text-center">
            <Tooltip title={brand?.description} className="cursor-pointer underline ">
              read
            </Tooltip>
          </div>
        </td> */}
        <td className="px-2 py-4 whitespace-nowrap text-center border border-gray-400 text-[12px] font-medium text-black">
          {brand?.categories?.map((item) => item?.name).join(", ")}
        </td>

        <td className="px-6 py-4 whitespace-nowrap border border-gray-400">
          <CustomToggle
            checked={brand.isActive}
            // loading={loading}
            // disabled={loading}
            onChange={(val) => handleStatusChange(val)}
          />
        </td>
        <td className="px-6 py-4 whitespace-nowrap  border border-gray-400">
          {getFixedDateAndTimeString(brand?.createdAt)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap border border-gray-400">
          {getFixedDateAndTimeString(brand?.updatedAt)}
        </td>

        <td className="px-2 py-4 border border-gray-400">
          <div className="flex gap-4 justify-center">
            <Tooltip title="Edit Brand">
              <button
                onClick={() => handleEdit(brand._id)}
                className="custom-btn custom-border bg-green-600! text-white hover:text-[#e5e5e5]!"
              >
                <MdModeEditOutline className="text-lg" />
              </button>
            </Tooltip>
            <Tooltip title="Delete Brand">
              <button className="custom-btn custom-border bg-red-600! text-white hover:text-[#e5e5e5]!">
                <MdDeleteOutline className="text-lg" />
              </button>
            </Tooltip>
          </div>
        </td>
      </tr>
    </>
  );
};

export default BrandRow;
