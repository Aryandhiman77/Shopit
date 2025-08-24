import Badge from "../../Elements/Badge";
import Rating from "@mui/material/Rating";
import { data, Link } from "react-router-dom";
import { GiExpand } from "react-icons/gi";
import "./style.css";
import {
  IoCartOutline,
  IoGitCompareOutline,
  IoHeartOutline,
} from "react-icons/io5";
import GetRating from "./rating";
import Button from "@mui/material/Button";
import React, { useEffect, memo } from "react";
const ProductItem = ({ item, horizontal = false }) => {
  const smText = horizontal ? "text-lg" : "text-sm";
  const lgText = horizontal ? "text-2xl" : "text-lg";
  return (
    <Link className={`product-item ${horizontal ? "list-view" : "grid-view"}`}>
      <div className="overflow-hidden block rounded-t-lg ">
        <img
          className="h-full w-[20rem] hover:scale-110 transition-all ease-in-out duration-500 object-contain relative bg-white"
          width={400}
          height={600}
          src={item?.image}
          alt="product image"
        />
      </div>
      <div
        className={`details p-2 w-full flex flex-col ${
          horizontal ? "gap-2" : "gap-1"
        }`}
      >
        <p
          className={`text-black ${
            horizontal ? "text-[16px]" : "text-[13px]"
          } font-[500]`}
        >
          {item?.productName}
        </p>
        <p
          className={`text-black ${
            horizontal ? "text-[15px]" : "text-[13px]"
          } line-clamp-2`}
        >
          {item?.description}
        </p>
        <div className="flex items-center gap-x-1 w-full pr-2 rounded-lg">
          {GetRating(item?.rating)}
          <p className={`${smText} text-gray-400`}>({item?.reviewsLength})</p>
        </div>
        <div className="flex flex-row gap-x-3 font-[system-ui]">
          <p className={`${smText} line-through text-gray-400`}>
            ₹ {Number(item?.mrpPrice).toLocaleString()}
          </p>
          <p className={`${smText} font-semibold text-primary`}>
            ₹ {Number(item?.sellingPrice).toLocaleString()}
          </p>
        </div>
        <Button
          className={`!mt-2 ${
            horizontal ? "w-1/5" : "w-full"
          } p-3 addToCart-btn !border-[1px] !border-primary !text-primary hover:!bg-black hover:!text-white  hover:!border-black gap-x-2`}
        >
          <IoCartOutline className={`${lgText}`} />
          <IoCartOutline className={`${lgText}`} />
          Add to Cart
        </Button>
      </div>

      {/* child buttons */}
      <div className="discount-icons absolute top-2 -left-4 !text-[12px] transition-all duration-300 ease-in-out ">
        <Badge value={item?.discountPercentage} size={1} color="bg-primary" />
      </div>
      <div className="right-icons absolute -top-40 right-3 !text-[12px] space-y-2 transition-all duration-300 ease-in-out opacity-[0.9] ">
        <GiExpand className="icon-hover border-[1px] rounded-full p-[5px] text-center text-3xl bg-white border-gray-200 hover:bg-primary hover:text-white" />
        <IoGitCompareOutline className="icon-hover border-[1px] rounded-full p-[4px] text-center text-3xl bg-white border-gray-200 hover:bg-primary hover:text-white" />
        <IoHeartOutline className="icon-hover border-[1px] rounded-full p-[4px] text-center text-3xl bg-white border-gray-200 hover:bg-primary hover:text-white " />
      </div>
    </Link>
  );
};

export default React.memo(ProductItem);
