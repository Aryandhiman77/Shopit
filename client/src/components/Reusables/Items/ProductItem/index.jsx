import Rating from "@mui/material/Rating";
import React from "react";
import { Link } from "react-router-dom";


const ProductItem = ({ info }) => {
  return (
    <Link className="w-[13vw] min-w-[12.5rem] max-w-[20rem] p-2 shadow-[0_3px_12px_0.1px_rgba(0,0,0,0.3)] rounded-lg flex justify-around flex-col items-center border-[1px] border-[#e5e5e5] hover:scale-105 transition-all duration-200 ease-in-out ">
      <img
        className="h-[150px] w-[150px] hover:scale-105 transition-all ease-in-out duration-250 object-contain"
        width={400}
        height={600}
        src="http://localhost:5173/@fs/Users/aryan/Desktop/Projects/e-comm%20images/iphonvar.jpg"
        alt=""
      />
      <div className="details pt-2 mx-2 w-full">
        <p className="text-black text-[13px] font-[500]">Iphone 16 black</p>
        <p className="text-black text-[13px] line-clamp-2">
          Apple iPhone 16 black, mat back, A18 chipset, dolby visionasfassldafjksdajfljsaklfjlfjaslfjslajflasjlkfjssfkjasklfjklsajfklsj
        </p>
        <div className="flex items-center gap-x-1 w-fit pr-2 rounded-lg">
          <Rating
            value={4.7}
            precision={0.1}
            size="small"
            readOnly
            className="py-2 !text-red-600"
          />
          <p>4.7</p>
          <p className="text-sm text-gray-400">(880)</p>
        </div>
        <div className="flex flex-row gap-x-3 font-[system-ui]">
          <p className="text-sm line-through text-gray-400">₹ 1,150</p>
          <p className="text-sm font-semibold text-primary">₹300</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
