import React, { useState } from "react";
import { IoMdCheckmark, IoMdCheckmarkCircle, IoMdCloseCircle } from "react-icons/io";
import { PiCheckCircle, PiCrossDuotone } from "react-icons/pi";

const CustomToggle = ({defaultChecked,getToggleState}) => {
  const [isOn, setIsOn] = useState(defaultChecked?true:false);

  return (
    <div
      onClick={() => setIsOn(!isOn)}
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
          <IoMdCheckmarkCircle size={"large"} className="text-green-600" />
        ) : (
          <IoMdCloseCircle size={"large"} className="text-red-600" />
        )}
      </div>
    </div>
  );
};

export default CustomToggle;
