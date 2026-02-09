import { Tooltip } from "@mui/joy";
import React, { useEffect, useState } from "react";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoMdEye,
  IoMdEyeOff,
} from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";
import { getFixedDateAndTimeString } from "../../../utilities/getDateAndTime";
import SubCategoryRow from "./SubCategoryRow";
import useData from "../../hooks/useData";
import CustomToggle from "../../Reusables/Elements/CustomToggle";

const CategoryRow = ({ category, index, handleEdit }) => {
  const [isItemsHidden, setIsItemsHidden] = useState(true);
  const { updateCategoryStatus, isLoading, handleFullScreenConfirmation } =
    useData();

  const handleStatusChange = (val) => {
    {
      if (category?.isActive === true && category.childCategories?.length) {
        handleFullScreenConfirmation({
          fn: () =>
            updateCategoryStatus({
              id: category._id,
              isActive: val,
            }),
          message: category.isActive === true && (
            <>
              Disabling this category will also disable its all
              children-categories.
              <br />
              <br /> Are you sure you want to save changes.
            </>
          ),
        });
        return;
      } else {
        updateCategoryStatus({
          id: category._id,
          isActive: val,
        });
      }
    }
  };
  return (
    <>
      {!isItemsHidden && (
        <tr>
          <td>&nbsp;</td>
        </tr>
      )}

      <tr
        className={`border ${isItemsHidden ? "border" : "border-2 border-black border-b-0 bg-amber-50"} dark:bg-gray-900 dark:border-gray-400! border-gray-500`}
      >
        <td className="px-2 py-4 whitespace-nowrap text-center border">
          {index + 1}
        </td>
        <td className="px-6 py-4 border border-gray-400">
          <div className="w-[150px]">
            <img
              loading="lazy"
              src={category?.image?.url}
              className="w-20 h-auto rounded-xl  object-cover"
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
        <td className="px-2 py-4 whitespace-nowrap text-center border border-gray-400 ">
          {category?.childCategories?.length > 0 && (
            <button
              className="custom-btn bg-primary!"
              onClick={() => setIsItemsHidden(!isItemsHidden)}
            >
              <div className="flex items-center gap-2 text-white">
                {category?.childCategories?.length}
                {isItemsHidden ? (
                  <IoMdEye color="white" size={20} />
                ) : (
                  <IoMdEyeOff color="white" size={20} />
                )}
              </div>
            </button>
          )}
        </td>

        {/* <td className="px-6 py-4 whitespace-nowrap border border-r-gray-400">
          {category?.level2?.name}
        </td>
        <td className="px-6 py-4 whitespace-nowrap border border-r-gray-400">
          {category?.level3?.name}
        </td> */}
        <td className="px-6 py-4 whitespace-nowrap border border-gray-400">
          <CustomToggle
            checked={category.isActive}
            loading={isLoading(`update-${category._id}-category`)}
            disabled={isLoading(`update-${category._id}-category`)}
            onChange={(val) => handleStatusChange(val)}
          />
        </td>
        <td className="px-6 py-4 whitespace-nowrap  border border-gray-400">
          {getFixedDateAndTimeString(category?.createdAt)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap border border-gray-400">
          {getFixedDateAndTimeString(category?.updatedAt)}
        </td>

        <td className="px-2 py-4 border border-gray-400">
          <div className="flex gap-4 justify-center">
            <Tooltip title="Edit Category">
              <button
                onClick={() => handleEdit(category._id)}
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
      <>
        {!isItemsHidden &&
          category.childCategories?.map((subcat, i) => (
            <SubCategoryRow
              key={`subcat-${i}`}
              subCategory={subcat}
              indexParent={index}
              indexSubCat={i}
              handleEdit={handleEdit}
            />
          ))}
      </>
      {!isItemsHidden && (
        <tr>
          <td>&nbsp;</td>
        </tr>
      )}
    </>
  );
};

export default CategoryRow;
