import Divider from "@mui/material/Divider";
import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Link } from "react-router-dom";
import { IoMdArrowDropdown,IoMdArrowDropright } from "react-icons/io";

import Button from "@mui/material/Button";
import { IoArrowDown } from "react-icons/io5";

function valuetext(value) {
  return `${value}°C`;
}
const Sidebar = () => {
  const [value, setValue] = React.useState([20, 37]);
  const [display, setDisplay] = React.useState("hidden");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSideBarDisplay = () => {
    if (display === "hidden") {
      setDisplay("block");
    } else {
      setDisplay("hidden");
    }
  };
  return (
    <div className="w-full bg-white mt-5">
      <Link
        onClick={handleSideBarDisplay}
        className="flex justify-between items-center"
      >
        <div className="heading !text-2xl p-2 font-[500]">Filter</div>
        { display==="hidden"?<IoMdArrowDropright className="text-4xl" />:<IoMdArrowDropdown className="text-4xl" />}
      </Link>
      <Divider />
      <div className={`filters ${display} transition-all -top-100`}>
        <h1 className="font-[500] p-2">By tags</h1>
        <Divider />
        <div className="tags flex flex-row flex-wrap p-2 gap-1 ">
          <div className="border-[1px] border-gray-300 py-1 px-2 rounded-2xl text-sm font-light;">
            sdlfajl
          </div>
          <div className="border-[1px] border-gray-300 py-1 px-2 rounded-2xl text-sm font-light;">
            sdlfajl
          </div>
          <div className="border-[1px] border-gray-300 py-1 px-2 rounded-2xl text-sm font-light;">
            sdlfajl
          </div>
          <div className="border-[1px] border-gray-300 py-1 px-2 rounded-2xl text-sm font-light;">
            sdlfajl
          </div>
          <div className="border-[1px] border-gray-300 py-1 px-2 rounded-2xl text-sm font-light;">
            sdlfajl
          </div>
        </div>
        <Divider />
        <h1 className="font-[500] p-2">By price</h1>
        <Divider />
        <div className="flex items-center justify-center flex-col">
          <Box sx={{ width: 200 }}>
            <Slider
              getAriaLabel={() => "Temperature range"}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
            />
          </Box>
          <div>{value}</div>
        </div>
        <Divider />
        <h1 className="font-[500] p-2">By Categories</h1>
        <Divider />
        <ul className="p-2">
          <li className="flex justify-between">
            <Link className="p-2" to={"/"}>
              Electronics
            </Link>
            <input type="checkbox" />
          </li>
          <li className="flex justify-between">
            <Link className="p-2" to={"/"}>
              Fashion
            </Link>
            <input type="checkbox" />
          </li>
          <li className="flex justify-between">
            <Link className="p-2" to={"/"}>
              Home & furniture
            </Link>
            <input type="checkbox" />
          </li>
          <li className="flex justify-between">
            <Link className="p-2" to={"/"}>
              Clothes
            </Link>
            <input type="checkbox" />
          </li>
          <li className="flex justify-between">
            <Link className="p-2" to={"/"}>
              Sports
            </Link>
            <input type="checkbox" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
