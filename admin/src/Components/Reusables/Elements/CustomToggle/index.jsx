import React, { useEffect, useState } from "react";
import {
  IoMdCheckmark,
  IoMdCheckmarkCircle,
  IoMdCloseCircle,
} from "react-icons/io";
import { PiCheckCircle, PiCrossDuotone } from "react-icons/pi";
import Spinner from "../Loader/Spinner";

const CustomToggle = ({
  checked,
  onChange,
  disabled,
  loading = false,
  disableIcons = false,
  activeText = "Active",
  inActiveText = "Inactive",
}) => {
  return (
    <div
      onClick={() => {
        if (!disabled && !loading) {
          onChange(!checked);
        }
      }}
      className={`relative ${!disableIcons ? "w-12" : "w-full"} x h-7 flex items-center rounded-full cursor-pointer transition-colors ${
        checked ? "bg-green-700" : "bg-red-600"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {disableIcons && (
        <>
          {checked ? (
            <p className="absolute left-2 text-white text-center w-[45%] font-medium text-[13px] select-none">
              {activeText}
            </p>
          ) : (
            <p className="absolute right-2 text-white text-center w-[45%] font-medium text-[13px] select-none">
              {inActiveText}
            </p>
          )}
        </>
      )}
      {!disableIcons ? (
        <div
          className={`absolute top-[2px] w-6 h-6 rounded-full flex items-center justify-center bg-white shadow-md transform transition-transform ${
            checked ? "translate-x-[calc(100%-2px)]" : "translate-x-[2px]"
          }`}
        >
          {loading ? (
            <Spinner size={20} />
          ) : checked ? (
            <IoMdCheckmarkCircle size={30} className="text-green-700" />
          ) : (
            <IoMdCloseCircle size={30} className="text-red-600" />
          )}
        </div>
      ) : (
        <div
          className={`absolute top-[2px] w-[50%] rounded-full flex items-center justify-center bg-white shadow-md transform transition-transform ${
            checked ? "translate-x-[calc(100%-2px)]" : "translate-x-[2px]"
          }`}
        >
          <div
            className={`h-6 text-[12px] flex items-center w-full ${checked ? "bg-green-200" : "bg-red-200"} rounded-full `}
          ></div>
        </div>
      )}
    </div>
  );
};

export default CustomToggle;
