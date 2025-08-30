import Button from "@mui/material/Button";
import React, { useState } from "react";
import {
  IoIosArrowUp,
  IoIosArrowDown,
  IoIosAdd,
  IoIosRemove,
} from "react-icons/io";

const QuantityBox = ({
  maxBuyableQuantity = 100,
  btnsOrientation = "vertical",
}) => {
  const [value, setValue] = useState(1);
  const handleManualInput = (e) => {
    let enteredval = Number(e.target.value);
    if (enteredval >= maxBuyableQuantity) {
      setValue(maxBuyableQuantity);
    } else if (enteredval <= 1) {
      setValue(1);
    } else {
      setValue(enteredval);
    }
  };
  const handleIncrement = () => {
    if (value === maxBuyableQuantity) {
      setValue(maxBuyableQuantity);
    } else {
      setValue(value + 1);
    }
  };
  const handleDecrement = () => {
    if (value === 1) {
      setValue(1);
    } else {
      setValue(value - 1);
    }
  };
  return (
    <div className="flex flex-col">
      <div
        className={`border-[1px] border-primary bg-white  w-20 flex justify-between rounded-sm overflow-hidden ${
          btnsOrientation === "vertical" ? "w-full" : "relative items-center"
        }`}
      >
        <input
          type="number"
          value={value}
          onChange={handleManualInput}
          min={0}
          max={100}
          className="focus:outline-none px-5 py-2 text-center"
        />
        {btnsOrientation === "vertical" ? (
          <div className="flex flex-col h-full">
            <button
              onClick={handleIncrement}
              className="hover:bg-primary hover:text-white cursor-pointer p-1 border-l-[1px] border-l-primary border-b-[1px] border-b-primary h-[50%] active:bg-black"
            >
              <IoIosArrowUp />
            </button>
            <button
              onClick={handleDecrement}
              className="hover:bg-primary hover:text-white cursor-pointer p-1 border-l-[1px] border-l-primary h-[50%] active:bg-black"
            >
              <IoIosArrowDown />
            </button>
          </div>
        ) : (
          <div className="flex flex-row justify-between h-full w-full absolute">
            <button
              onClick={handleIncrement}
              className="hover:bg-primary hover:text-white cursor-pointer p-1  h-[100%] active:bg-black
          "
            >
              <IoIosAdd />
            </button>
            <button
              onClick={handleDecrement}
              className="hover:bg-primary hover:text-white cursor-pointer p-1 h-[100%] active:bg-black
          "
            >
              <IoIosRemove />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuantityBox;
