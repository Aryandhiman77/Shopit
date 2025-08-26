import Button from "@mui/material/Button";
import React, { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const QuantityBox = ({ maxBuyableQuantity = 100 }) => {
  const [value, setValue] = useState(1);
  const handleManualInput = (e) => {
    let enteredval=Number(e.target.value);
    if(enteredval >= maxBuyableQuantity){
        setValue(maxBuyableQuantity);
    }else if(enteredval <= 1){
        setValue(1);
    }else{
        setValue(enteredval);
    }
  };
  const handleIncrement = () => {
    if (value === maxBuyableQuantity) {
      setValue(maxBuyableQuantity);
    }else{
        setValue(value+ 1);
    }
  };
  const handleDecrement = () => {
    if (value === 1) {
      setValue(1);
    }else{
        setValue(value- 1);
    }
  };
  return (
    <div className="flex flex-col">
    <div className="border-[1px] border-[#e5e5e5]  w-20 flex justify-between">
      <input
        type="number"
        value={value}
        onChange={handleManualInput}
        min={0}
        max={100}
        className="focus:outline-none p-2"
      />
      <div className="flex flex-col h-full">
        <button
          onClick={handleIncrement}
          className="hover:bg-primary hover:text-white cursor-pointer p-1 border-[1px] border-[#e5e5e5] h-[50%] active:bg-black"
        >
          <IoIosArrowUp />
        </button>
        <button
          onClick={handleDecrement}
          className="hover:bg-primary hover:text-white cursor-pointer p-1 border-[1px] border-[#e5e5e5] h-[50%] active:bg-black"
        >
          <IoIosArrowDown />
        </button>
      </div>
    </div>
    </div>
  );
};

export default QuantityBox;
