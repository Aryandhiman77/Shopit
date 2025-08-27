import Divider from "@mui/material/Divider";
import React from "react";

import {
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaThumbsUp,
  FaThumbsDown,
} from "react-icons/fa6";
const ReviewItem = ({rating}) => {
    let ratingColor = (rating <=5 && rating >= 3 ) ? "#388e3c" : (rating < 3 && rating > 2) ? "#ff9f00" :"#ff6161";
  return (
    <div className="review">
      <Divider />
      <div className="box flex flex-col gap-2 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="rating text-white p-2 rounded-lg" style={{background:`${ratingColor}`}}>
              {rating} ★
            </div>
            <div className="review-title font-[600] text-black">
              Good Choice
            </div>
          </div>
          <div className="flex gap-5 items-center text-center">
            <button className="rounded-lg cursor-pointer hover:bg-[#e5e5e5] hover:text-primary p-2">
              <FaRegThumbsUp className="text-2xl" />
              <p>92</p>
            </button>
            <button className="rounded-lg cursor-pointer hover:bg-[#e5e5e5] hover:text-primary p-2">
              <FaRegThumbsDown className="text-2xl" />
              <p>2</p>
            </button>
          </div>
        </div>
        <div className="review-description font-[500] text-black">
          great product, great bass.
        </div>
        <div className="flex flex-row items-center  text-sm font-[600]">
          <div>Aryan dhiman</div>
          <span className="mx-2">|</span>
          <div>Ambala District</div>
          <span className="mx-2">|</span>
          <div className="review-timeStamp">10 days ago</div>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
