import React, { useEffect, useState } from "react";
import {
  IoMdCheckmark,
  IoMdCheckmarkCircle,
  IoMdCloseCircle,
} from "react-icons/io";
import { PiCheckCircle, PiCrossDuotone } from "react-icons/pi";
import Spinner from "../Loader/Spinner";

const CustomToggle = ({ checked, onChange, disabled, loading }) => {
  return (
    <div
      onClick={() => {
        if (!disabled && !loading) {
          onChange(!checked);
        }
      }}
      className={`relative w-12 h-7 flex items-center rounded-full cursor-pointer transition-colors ${
        checked ? "bg-green-600" : "bg-red-600"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <div
        className={`absolute top-[2px] w-6 h-6 rounded-full flex items-center justify-center bg-white shadow-md transform transition-transform ${
          checked ? "translate-x-[22px]" : "translate-x-[2px]"
        }`}
      >
        {loading ? (
          <Spinner size={20} />
        ) : checked ? (
          <IoMdCheckmarkCircle size={30} className="text-green-600" />
        ) : (
          <IoMdCloseCircle size={30} className="text-red-600" />
        )}
      </div>
    </div>
  );
};

export default CustomToggle;
