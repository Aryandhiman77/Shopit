import React from "react";
import { Tooltip } from "@mui/joy";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoMdEye,
  IoMdEyeOff,
} from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";
import { getFixedDateAndTimeString } from "../../../../utilities/getDateAndTime";
import useData from "../../../hooks/useCategory";
import CustomToggle from "../../../Reusables/Elements/CustomToggle";
const InnerSubCategoryRow = ({
  innerSubcategory,
  indexParent,
  indexSubCat,
  indexInnerSubCat,
  handleEdit,
}) => {
  const { updateCategoryStatus, isLoading } = useData();
  return (
    <>
      <tr className="border-2 bg-[#f4dba8] dark:bg-gray-700 hover:dark:bg-gray-600 ">
        <td className="px-2 py-4 whitespace-nowrap text-center border">
          {indexParent + 1}.{indexSubCat + 1}.{indexInnerSubCat + 1}.
        </td>
        <td className="px-6 py-4">
          <div className="w-[150px] flex justify-center ">
            <img
              src={innerSubcategory?.image?.url}
              className="w-20 h-auto rounded-xl  object-cover"
              alt=""
            />
          </div>
        </td>
        <td className="px-6 py-4 border border-gray-400 ">
          <div className="p-2">
            <p className="text-[12px] font-[600] capitalize">
              {innerSubcategory?.name}
            </p>
          </div>
        </td>
        <td className="px-2 py-4 whitespace-nowrap text-center border border-gray-400 ">
          -
        </td>
        <td className="px-6 py-4 whitespace-nowrap border border-gray-400">
          <CustomToggle
            checked={innerSubcategory.isActive}
            loading={isLoading(`update-${innerSubcategory._id}-category`)}
            disabled={isLoading(`update-${innerSubcategory._id}-category`)}
            onChange={(val) => {
              updateCategoryStatus({
                id: innerSubcategory._id,
                isActive: val,
              });
            }}
          />
        </td>
        <td className="px-6 py-4 whitespace-nowrap  border border-gray-400">
          {getFixedDateAndTimeString(innerSubcategory?.createdAt)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap border border-gray-400">
          {getFixedDateAndTimeString(innerSubcategory?.updatedAt)}
        </td>

        <td className="px-6 py-4 border border-gray-400">
          <div className="flex gap-4 justify-center">
            <Tooltip title="Edit Category">
              <button
                onClick={() => handleEdit(innerSubcategory._id)}
                className="custom-btn custom-border bg-green-600! text-white hover:text-[#e5e5e5]!"
              >
                <MdModeEditOutline className="text-lg" />
              </button>
            </Tooltip>
            <Tooltip title="Delete Category">
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

export default InnerSubCategoryRow;
