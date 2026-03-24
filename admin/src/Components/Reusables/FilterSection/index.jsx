import { useState } from "react";
import CollapsablePanel from "../CollapsablePanel";
import DropDownField from "../DropDownField";
import Box from "../Elements/Box";
import { IoIosArrowDown, IoMdClose, IoMdRefresh } from "react-icons/io";
import Search from "../Search";
import { CiFilter } from "react-icons/ci";
import { Divider, Tooltip } from "@mui/material";
import useFilters from "../../../Components/hooks/useFilters";

const FitlerSection = ({ children, className }) => {
  const [open, setOpen] = useState(false);
  const { filters, setFilters, handleOnChange, resetFilters } = useFilters();
  return (
    <>
      <div className={" w-full"}>
        <div className="p-5 bg-white custom-border">
          <div className="flex items-center gap-2">
            <Search
              width={50}
              placeholder={"Search by title, sku, id"}
              className={"bg-white"}
              onSearch={(value) => handleOnChange({ search: value })}
            />

            <button
              className={`custom-btn flex items-center gap-2 bg-blue-500! text-white text-sm font-[500] rounded-md! hover:text-white! px-4! `}
            >
              <Tooltip title="Apply filters">
                <div className="flex gap-1 items-center">Apply</div>
              </Tooltip>
            </button>
            <button
              onClick={resetFilters}
              className={`custom-btn custom-border flex items-center gap-2 !bg-transparent text-black! text-sm font-[500] border! border-gray-400! rounded-md! hover:text-black!  px-4!`}
            >
              <Tooltip title="Clear all filters">
                <div className="flex gap-1 items-center">Reset</div>
              </Tooltip>
            </button>
            <button
              onClick={() => setOpen(!open)}
              className={`custom-btn custom-border flex items-center gap-2 !bg-transparent text-black! text-sm font-[500] border! border-gray-400! rounded-md! hover:text-black! ${open && "bg-blue-100!"}`}
            >
              <Tooltip
                title={`${open ? "Collpase filters" : "Expand more filters"}`}
              >
                <div className="flex gap-1 items-center">
                  <CiFilter size={19} />
                </div>
              </Tooltip>
            </button>
          </div>

          <CollapsablePanel
            isOpened={open}
            className="flex justify-between items-center "
          >
            <div className={`w-full `}>
              <div
                className={`flex gap-5 w-full items-center flex-row flex-wrap  ${className}`}
              >
                {children}
              </div>
            </div>
          </CollapsablePanel>
        </div>
      </div>
    </>
  );
};

export default FitlerSection;
