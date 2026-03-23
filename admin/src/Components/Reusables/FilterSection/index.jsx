import { useState } from "react";
import CollapsablePanel from "../CollapsablePanel";
import DropDownField from "../DropDownField";
import Box from "../Elements/Box";
import { IoIosArrowDown } from "react-icons/io";
import Search from "../Search";

const FitlerSection = ({ children, className }) => {
  const [open, setOpen] = useState(false);
  return (
    <Box className={"bg-white w-full"}>
      <div className="flex justify-between items-center gap-5">
        <p className="font-[500] text-gray-600">Filters</p>
        <Search width={50} placeholder={"Search by title, sku, id"} />
        <button onClick={() => setOpen(!open)} className="cursor-pointer">
          <IoIosArrowDown
            className={`transition-all duration-150 ${open ? "rotate-180" : "rotate-0"}`}
            size={20}
          />
        </button>
      </div>
      <div className="flex justify-between items-center">
        <CollapsablePanel isOpened={open} className={`w-full`}>
          <div
            className={`flex gap-5 w-full items-center flex-row flex-wrap  ${className}`}
          >
            {children}
          </div>
        </CollapsablePanel>
      </div>
    </Box>
  );
};

export default FitlerSection;
