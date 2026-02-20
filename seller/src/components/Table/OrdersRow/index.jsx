import { Tooltip } from "@mui/joy";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";
import CollapsablePanel from "../../Reusables/CollapsablePanel";

const OrderRow = ({ order }) => {
  const [itemsHidden, setItemsHidden] = useState(true);
  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 overflow-hidden">
        <td className="px-4 py-4 w-10">
          <button
            onClick={() => setItemsHidden(!itemsHidden)}
            className={`custom-btn !rounded-full custom-border !p-1 ${itemsHidden?"!bg-white":"!bg-gray-800"}`}
          >
            {
              itemsHidden ?<IoIosArrowDown className="text-2xl" />:
              <IoIosArrowUp className="text-2xl text-white" />
            }
            
          </button>
        </td>
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {order?.orderId}
        </th>

        <td className="px-6 py-4 whitespace-nowrap">{order?.paymentId}</td>
        <td className="px-6 py-4 whitespace-nowrap">{order?.username}</td>
        <td className="px-6 py-4 whitespace-nowrap">{order?.phoneNumber}</td>
        <td className="px-6 py-4 whitespace-nowrap">{order?.items?.length}</td>
        <td className="px-6 py-4 whitespace-nowrap">{order?.price}</td>
        <td className="px-6 py-4 whitespace-nowrap">{order?.createdAt}</td>
        <td className="px-6 py-4 whitespace-nowrap">{order?.modifiedAt}</td>

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

      {!itemsHidden && (
        <>  
          <tr className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400 w-full">
            <th scope="col" class="px-16 py-3">
              <span class="sr-only">Image</span>
            </th>
            <th scope="col" class="px-6 py-3">
              Product
            </th>
            <th scope="col" class="px-6 py-3">
              Qty
            </th>
            <th scope="col" class="px-6 py-3">
              Price
            </th>
            <th scope="col" class="px-6 py-3">
              Order Status
            </th>
            <th scope="col" class="px-6 py-3">
              Action
            </th>
          </tr>
          {order.items?.map((item,i) => (
            <tr key={i} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
              <td class="p-4">
                <img
                  src={item?.image}
                  class="w-16 md:w-32 max-w-full max-h-full"
                  alt="product image"
                />
              </td>
              <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                {item?.name}
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div>{item?.quantity}</div>
                </div>
              </td>
              <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                {item?.price}
              </td>
              <td className={`px-6 py-4`}>
                <td
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
                </td>
              </td>
              <td class="px-6 py-4">
                <a
                  href="#"
                  class="font-medium text-red-600 dark:text-red-500 hover:underline"
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

export default OrderRow;
