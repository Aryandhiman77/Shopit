import { useEffect, useState } from "react";
import CollapsablePanel from "../CollapsablePanel";
import { IoIosSearch, IoMdRefresh } from "react-icons/io";
import { CiFilter } from "react-icons/ci";
import { Tooltip } from "@mui/material";
import Search from "../../../Components/Reusables/Search";

const FitlerSection = ({
  children,
  className,
  handleOnChange,
  onReset = () => {},
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={" w-full"}>
        <div className="p-5 bg-white custom-border">
          <div className="flex items-center gap-2">
            <Search
              className={"w-full"}
              onSearch={(search) => {
                handleOnChange({ search, page: 1 });
              }}
              placeholder={"Search product title, sku, id"}
            />

            <button
              type="reset"
              onClick={onReset}
              className={`custom-btn custom-border flex items-center gap-2 !bg-transparent text-black! text-sm font-[500] border! border-gray-400! rounded-md! hover:text-black!  px-4!`}
            >
              <Tooltip title="Clear all filters">
                <div className="flex gap-1 items-center">Reset</div>
              </Tooltip>
            </button>
            <button
              type="button"
              role="button"
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
