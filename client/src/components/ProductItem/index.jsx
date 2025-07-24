import Rating from "@mui/material/Rating";
import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ info }) => {
  return (
    // <Link
    //   to={"/"}
    //   className="flex flex-col justify-center items-center p-3 gap-y-2 rounded-md bg-white cursor-pointer border-[1px] border-gray-300"
    //   style={{ boxShadow: "#08080866 0px 3px 12px 0.1px" }}
    // >
    //   <img
    //     className="h-[150px] w-[150px] object-contain hover:scale-105 hover:rotate-2 transition-all ease-in-out duration-250"
    //     src={''}
    //     alt="Category image"
    //   />
    //   <p className="text-[1rem]"></p>
    // </Link>
    <div className="w-[12rem] min-w-[10rem] h-auto p-2 shadow-[0_3px_12px_0.1px_rgba(8,8,8,0.4)] rounded-xl flex justify-center flex-col items-center">
      <img
        className="h-[150px] w-[150px] hover:scale-110 transition-all ease-in-out duration-250 object-cover"
        width={400}
        height={600}
        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
        alt=""
      />
      <div className="details py-2">
        <p className="text-black text-[16px]">product name</p>
        <p className="text-black text-[13px] line-clamp-2">
          this is the mini description of the product
        </p>
        <div className="bg-[#e4ffd5] flex items-center gap-x-1 w-fit pr-2 rounded-lg">
          <Rating
            value={4.7}
            precision={0.1}
            size="small"
            readOnly
            className="py-2 !text-green-600"
          />
          <p>4.7</p>
          <p className="text-sm text-gray-400">(880)</p>
        </div>
        <div className="flex flex-row gap-x-3 font-[system-ui]">
          <p className="text-sm line-through text-gray-400">₹ 1,150</p>
          <p className="text-sm font-semibold text-gray-800">₹300</p>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
