import React from "react";
import logo from "../../assets/admin-logo.jpg";
import { BsPlus } from "react-icons/bs";
import { Button, Divider } from "@mui/material";
import {
  MdIosShare,
  MdOutlineDashboard,
  MdSupervisedUserCircle
} from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";

import MButton from "../Reusables/Elements/MButton";
import { PiSlideshowDuotone } from "react-icons/pi";
import CollapablePanel from "../Reusables/CollapsablePanel"
import { IoBagCheckOutline, IoEye, IoList, IoLogOut, IoLogOutOutline } from "react-icons/io5";
import { TbCategory } from "react-icons/tb";
import { FaBoxOpen } from "react-icons/fa6";





const SideBar = () => {
  return (
    <div className="bg-white w-full sticky top-0">
      <div className="logo  ">
        <div className="relative flex justify-center items-center">
          <img src={logo} alt="shopit" className="w-18 h-auto" />
          <p className="text-gray-600 text-2xl font-[600] ">Shopit Admin</p>
        </div>
      </div>
      <Divider />
      <div className="sidebar-content p-2">
        <ul className="flex flex-col gap-1">
          <li>
            <MButton
              title="Dashboard"
              startIcon={<MdOutlineDashboard className="text-xl" />}
            />
          </li>
          <Divider/>
          <li>
            <MButton
              title="Home Slides"
              startIcon={<PiSlideshowDuotone className="text-xl" />}
              endIcon={<RiArrowDropDownLine className="text-xl" />}
            />
            <CollapablePanel isOpened={true} className={"px-5"} >
              <MButton
              className={"!text-[13px] !font-[500]"}
                title="Add Slide"
                startIcon={<BsPlus className="text-lg" />}
              />
              <MButton
               className={"!text-[13px] !font-[500]"}
                title="View Slides"
                startIcon={<IoEye className="text-lg" />}
              />
            </CollapablePanel>
          </li>
          <Divider/>
           <li>
            <MButton
              title="Users"
              startIcon={<MdSupervisedUserCircle className="text-xl" />}
            />
          </li>
           <Divider/>
          <li>
            <MButton
              title="Product"
              startIcon={<FaBoxOpen className="text-xl" />}
              endIcon={<RiArrowDropDownLine className="text-xl" />}
            />
            <CollapablePanel isOpened={true} className={"px-5"} >
             <MButton
              className={"!text-[13px] !font-[500]"}
                title="Product List"
                startIcon={<IoList className="text-lg" />}
              />
              <MButton
               className={"!text-[13px] !font-[500]"}
                title="Add Product"
                startIcon={<BsPlus className="text-lg" />}
              />
            </CollapablePanel>
          </li>
          <Divider/>
          <li>
            <MButton
              title="Category"
              startIcon={<TbCategory className="text-xl" />}
              endIcon={<RiArrowDropDownLine className="text-xl" />}
            />
            <CollapablePanel isOpened={true} className={"px-5"} >
              <MButton
               className={"!text-[13px] !font-[500]"}
                title="Level 1"
                startIcon={<MdOutlineDashboard className="text-lg" />}
              />
              <MButton
               className={"!text-[13px] !font-[500]"}
                title="Level 2"
                startIcon={<MdOutlineDashboard className="text-lg" />}
              />
              <MButton
              className={"!text-[13px] !font-[500]"}
                title="Level 3"
                startIcon={<MdOutlineDashboard className="text-lg" />}
              />
            </CollapablePanel>
          </li>
          <Divider/>
          <li>
            <MButton
              title="Orders"
              startIcon={<IoBagCheckOutline className="text-xl" />}
            />
          </li>
          <Divider/>
          <li>
            <MButton
              title="Logout"
              startIcon={<IoLogOutOutline className="text-xl" />}
            />
          </li>
          <Divider/>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
