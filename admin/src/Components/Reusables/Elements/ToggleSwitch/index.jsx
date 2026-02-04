import React, { useEffect, useState } from "react";
import {
  IoMdCheckmark,
  IoMdCheckmarkCircle,
  IoMdCloseCircle,
} from "react-icons/io";
import { PiCheckCircle, PiCrossDuotone } from "react-icons/pi";

const CustomToggle = ({ defaultChecked, setValue }) => {
  const [isOn, setIsOn] = useState(defaultChecked ? true : false);
  useEffect(() => {
    setValue("isActive", isOn);
    console.log("rerender");
  }, [isOn]);
  return (
    <div
      onClick={() => {
        setIsOn(!isOn);
      }}
      className={`relative w-12 h-7 flex items-center rounded-full cursor-pointer transition-colors ${
        isOn ? "bg-green-600" : "bg-red-600"
      }`}
    >
      <div
        className={`absolute top-[2px] w-6 h-6 rounded-full flex items-center justify-center bg-white shadow-md transform transition-transform ${
          isOn ? "translate-x-[22px]" : "translate-x-[2px]"
        }`}
      >
        {isOn ? (
          <IoMdCheckmarkCircle size={30} className="text-green-600" />
        ) : (
          <IoMdCloseCircle size={30} className="text-red-600" />
        )}
      </div>
    </div>
  );
};

export default CustomToggle;
