import { Tooltip } from "@mui/joy";
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";
import CollapsablePanel from "../../../../components/Reusables/CollapsablePanel";
import Table from "../index";
import ProgressBar from "../../../../components/Reusables/Elements/ProgressBar";

const ProductRow = ({ product }) => {
  const [itemsHidden, setItemsHidden] = useState(true);
  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 overflow-hidden">
        <td className="px-4 py-4 w-10">
          <button
            onClick={() => setItemsHidden(!itemsHidden)}
            className={`custom-btn rounded-full! custom-border p-1! ${
              itemsHidden ? "bg-white!" : "bg-gray-800!"
            }`}
          >
            {itemsHidden ? (
              <IoIosArrowDown className="text-2xl" />
            ) : (
              <IoIosArrowUp className="text-2xl text-white" />
            )}
          </button>
        </td>
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {product?.id}
        </th>

        <td className="px-6 py-4 ">
          <div className="flex w-62.5 items-center">
            <img
              src={product?.thumbnail}
              className="h-20 w-auto rounded-xl  object-cover"
              alt=""
            />
            <div className="p-2">
              <p className="text-[12px] font-semibold">{product?.name}</p>
              <p className="text-[12px] font-medium text-black">
                {product?.brand}
              </p>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {product?.categories?.level1.name}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {product?.categories?.level2.name}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {product?.categories?.level3.name}
        </td>

        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex flex-col items-center">
            <ProgressBar value={2} />
            <p className="text-[12px]">
              <span className="text-gray-600 font-semibold">23</span> sales
            </p>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {product?.variants?.length}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">{product?.createdAt}</td>
        <td className="px-6 py-4 whitespace-nowrap">{product?.modifiedAt}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div
            className={`p-2  rounded-2xl text-white text-[12px] font-medium tracking-wide ${product?.status === "active" ? "bg-green-700" : product?.status === "inactive" ? "bg-red-700" : "bg-black"}`}
          >
            {product?.status}
          </div>
        </td>

        <td className="px-6 py-4">
          <div className="flex gap-1">
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
          </div>
        </td>
      </tr>

      {!itemsHidden && (
        <>
          <tr className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400 w-full">
            <th scope="col" className="px-16 py-3">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-6 py-3">
              Product
            </th>
            <th scope="col" className="px-6 py-3">
              Qty
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Order Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
          {product.variants?.map((item, i) => (
            <tr
              key={i}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <td className="p-4">
                <img
                  src={item?.image}
                  className="w-16 md:w-32 max-w-full max-h-full"
                  alt="product image"
                />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                {item?.name}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div>{item?.quantity}</div>
                </div>
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                {item?.price}
              </td>
              <td className={`px-6 py-4`}>
                <div
                  className={`px-6 py-2  ${
                    item?.status === "pending"
                      ? "bg-blue-800"
                      : item?.status === "processing"
                        ? "bg-orange-500"
                        : item?.status === "shipped"
                          ? "bg-cyan-800"
                          : item?.status === "cancelled"
                            ? "bg-red-700"
                            : item?.status === "refunded"
                              ? "bg-gray-700"
                              : item?.status === "delivered"
                                ? "bg-green-800"
                                : "bg-black"
                  } text-white rounded-2xl text-[12px] capitalize`}
                >
                  {item?.status}
                </div>
              </td>
              <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-red-600 dark:text-red-500 hover:underline"
                >
                  Remove
                </a>
              </td>
            </tr>
          ))}
        </>
      )}
    </>
  );
};

export default ProductRow;
