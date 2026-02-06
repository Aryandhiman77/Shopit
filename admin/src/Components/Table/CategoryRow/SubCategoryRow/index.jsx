import React, { useState } from "react";
import { Tooltip } from "@mui/joy";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoMdEye,
  IoMdEyeOff,
} from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";
import ToggleSwitch from "../../../Reusables/Elements/ToggleSwitch";
import { getFixedDateAndTimeString } from "../../../../utilities/getDateAndTime";
import InnerSubCategoryRow from "../InnerSubCategoryRow";
import useData from "../../../hooks/useData";
const SubCategoryRow = ({ subCategory, indexParent, indexSubCat }) => {
  const [isSubItemsHidden, setIsSubItemsHidden] = useState(true);
  const { updateCategory } = useData();
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
              className="w-40 h-auto rounded-xl  object-cover"
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
          {subCategory?.subcategories?.length > 0 && (
            <button
              className="custom-btn bg-primary!"
              onClick={() => setIsSubItemsHidden(!isSubItemsHidden)}
            >
              <div className="flex items-center gap-2 text-white">
                {subCategory?.subcategories?.length}
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
          <ToggleSwitch
            defaultChecked={subCategory.isActive}
            getValue={(val) => {
              if (subCategory.isActive !== val) {
                updateCategory({ isActive: val, id: subCategory.id });
              }
            }}
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
              <button className="custom-btn custom-border bg-green-600! text-white hover:text-[#e5e5e5]!">
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
        subCategory?.subcategories?.map((innerCat, i) => (
          <InnerSubCategoryRow
            key={`InnerSubCat-${i}`}
            innerSubcategory={innerCat}
            indexParent={indexParent}
            indexSubCat={indexSubCat}
            indexInnerSubCat={i}
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

//   {
//     subcats?.map((subcat, idx) => (
//       <React.Fragment key={`subCat-${index}-${idx + 1}`}>

//         {isSubItemsHidden ? "YES" : "NO"}
//         <InnerSubCategoryRow
//           isHidden={isSubItemsHidden}
//           innerSubcategories={subcat?.subcategories}
//           indexParent={index}
//           indeSubChild={idx}
//         />
//       </React.Fragment>
//     ))}
//   <tr>
//     <td>&nbsp;</td>
//   </tr>
