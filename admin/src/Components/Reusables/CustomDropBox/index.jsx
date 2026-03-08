import React from "react";
import upload from "../../../assets/upload.svg";

const CustomDropBox = () => {
  return (
    <div className="border border-dotted rounded-md w-full flex justify-center items-center flex-col">
      <img src={upload} alt="" className="w-80 h-auto " />
    </div>
  );
};

export default CustomDropBox;
