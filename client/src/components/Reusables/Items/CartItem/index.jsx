import React from "react";
import QuantityBox from "../../QuantityBox";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdDelete, MdDeleteOutline } from "react-icons/md";
import Button from "@mui/material/Button";
const CartItem = ({ item }) => {
  return (
    <div className="flex flex-row gap-4 bg-white rounded-xl m-3 items-center relative">
      <img
        className="h-25 w-25 m-2 rounded-lg object-cover"
        src="https://i.insider.com/66ed6324cfb7f307e5735cbe?width=1200&format=jpeg"
        alt=""
      />
      <div className="p-2 w-full">
        <button className="absolute top-2 right-3 cursor-pointer">
        <MdDeleteOutline className="text-2xl opacity-75 hover:text-primary"/>
        </button>
        <div className="brand text-[12px] font-[400] text-gray-600">
          <p>{item?.brand}</p>
        </div>
        <div className="product-name text-[13px] font-[500] line-clamp-1">{item?.name}</div>
        <div className="flex items-center gap-3 justify-between">
          <QuantityBox />
          <div className="price text-primary font-[600]">₹15000</div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
