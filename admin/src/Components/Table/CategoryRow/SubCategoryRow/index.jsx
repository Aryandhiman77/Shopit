import React, { useState } from "react";
import { Tooltip } from "@mui/joy";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoMdEye,
  IoMdEyeOff,
} from "react-icons/io";
import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";
import { getFixedDateAndTimeString } from "../../../../utilities/getDateAndTime";
import InnerSubCategoryRow from "../InnerSubCategoryRow";
import useCategory from "../../../hooks/useCategory";
import CustomToggle from "../../../Reusables/Elements/CustomToggle";
const SubCategoryRow = ({
  subCategory,
  indexParent,
  indexSubCat,
  handleEdit,
}) => {
  const [isSubItemsHidden, setIsSubItemsHidden] = useState(true);
  const { updateCategoryStatus, isLoading, handleFullScreenConfirmation } =
    useCategory();

  const handleStatusChange = (val) => {
    {
      if (
        subCategory?.isActive === true &&
        subCategory.childCategories?.length
      ) {
        handleFullScreenConfirmation({
          fn: () =>
            updateCategoryStatus({
              id: subCategory._id,
              isActive: val,
            }),
          message: subCategory.isActive === true && (
            <>
              Disabling this Sub-Category will also disable its all
              children-categories.
              <br />
              <br /> Are you sure you want to save changes.
            </>
          ),
        });
        return;
      } else {
        updateCategoryStatus({
          id: subCategory._id,
          isActive: val,
        });
      }
    }
  };

  return (
    <>
      {!isSubItemsHidden && (
        <tr>
          <td>&nbsp;</td>
        </tr>
      )}
      <tr className="border-2 bg-amber-100 dark:bg-gray-800 hover:dark:bg-gray-700 ">
        <td className="px-2 py-4 whitespace-nowrap text-center border">
          {indexParent + 1}.{indexSubCat + 1}.
        </td>
        <td className="px-6 py-4">
          <div className="w-[150px]">
            <img
              src={subCategory?.image?.url}
              className="w-20 h-auto rounded-xl  object-cover"
              alt=""
            />
          </div>
        </td>
        <td className="px-6 py-4 border border-gray-400 ">
          <div className="p-2">
            <p className="text-[12px] font-[600] capitalize">
              {subCategory?.name}
            </p>
          </div>
        </td>
        <td className="px-2 py-4 whitespace-nowrap text-center border border-gray-400 ">
          {subCategory?.childCategories?.length > 0 && (
            <button
              className="custom-btn bg-primary!"
              onClick={() => setIsSubItemsHidden(!isSubItemsHidden)}
            >
              <div className="flex items-center gap-2 text-white">
                {subCategory?.childCategories?.length}
                {isSubItemsHidden ? (
                  <IoMdEye color="white" size={20} />
                ) : (
                  <IoMdEyeOff color="white" size={20} />
                )}
              </div>
            </button>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap border border-gray-400">
          <CustomToggle
            checked={subCategory.isActive}
            loading={isLoading(`update-${subCategory._id}-category`)}
            disabled={isLoading(`update-${subCategory._id}-category`)}
            onChange={(val) => handleStatusChange(val)}
          />
        </td>
        <td className="px-6 py-4 whitespace-nowrap  border border-gray-400">
          {getFixedDateAndTimeString(subCategory?.createdAt)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap border border-gray-400">
          {getFixedDateAndTimeString(subCategory?.updatedAt)}
        </td>

        <td className="px-6 py-4 border border-gray-400">
          <div className="flex gap-4 justify-center">
            <Tooltip title="Edit Category">
              <button
                onClick={() => handleEdit(subCategory._id)}
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
      {!isSubItemsHidden &&
        subCategory?.childCategories?.map((innerCat, i) => (
          <InnerSubCategoryRow
            key={`InnerSubCat-${i}`}
            innerSubcategory={innerCat}
            indexParent={indexParent}
            indexSubCat={indexSubCat}
            indexInnerSubCat={i}
            handleEdit={handleEdit}
          />
        ))}
      {!isSubItemsHidden && (
        <tr>
          <td>&nbsp;</td>
        </tr>
      )}
    </>
  );
};

export default SubCategoryRow;
