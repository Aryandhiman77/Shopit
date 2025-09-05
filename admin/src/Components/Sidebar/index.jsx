import React, { useState } from "react";
import logo from "../../assets/admin-logo.jpg";
import { Divider } from "@mui/material";
import { useLocation } from "react-router-dom";

// Icons
import { MdOutlineDashboard, MdSupervisedUserCircle } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { PiSlideshowDuotone } from "react-icons/pi";
import {
  IoBagCheckOutline,
  IoEye,
  IoList,
  IoLogOutOutline,
} from "react-icons/io5";
import { TbCategory } from "react-icons/tb";
import { FaBoxOpen } from "react-icons/fa6";
import { BsPlus } from "react-icons/bs";

// Components
import MButton from "../Reusables/Elements/MButton";
import CollapablePanel from "../Reusables/CollapsablePanel";

// Sidebar configuration
const menuConfig = [
  {
    title: "Dashboard",
    icon: <MdOutlineDashboard className="text-xl" />,
    path: "/",
  },
  {
    title: "Home Slides",
    icon: <PiSlideshowDuotone className="text-xl" />,
    dropdown: [
      { title: "Add Slide", icon: <BsPlus className="text-lg" /> },
      { title: "View Slides", icon: <IoEye className="text-lg" /> },
    ],
  },
  {
    title: "Users",
    icon: <MdSupervisedUserCircle className="text-xl" />,
  },
  {
    title: "Products",
    icon: <FaBoxOpen className="text-xl" />,
    dropdown: [
      { title: "Product List", icon: <IoList className="text-lg" /> },
      { title: "Add Product", icon: <BsPlus className="text-lg" /> },
    ],
  },
  {
    title: "Categories",
    icon: <TbCategory className="text-xl" />,
    dropdown: [
      { title: "Level 1", icon: <MdOutlineDashboard className="text-lg" /> },
      { title: "Level 2", icon: <MdOutlineDashboard className="text-lg" /> },
      { title: "Level 3", icon: <MdOutlineDashboard className="text-lg" /> },
    ],
  },
  {
    title: "Orders",
    icon: <IoBagCheckOutline className="text-xl" />,
  },
  {
    title: "Logout",
    icon: <IoLogOutOutline className="text-xl" />,
  },
];

const SideBar = () => {
  const { pathname } = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (title) => {
    setOpenDropdown(openDropdown === title ? null : title);
  };

  return (
    <div className="bg-white w-full sticky top-0">
      {/* Logo */}
      <div className="logo">
        <div className="relative flex flex-col justify-center items-center py-4">
          <img src={logo} alt="shopit" className="w-18 h-auto" />
          <p className="text-gray-600 text-2xl font-[600]">Shopit Admin</p>
        </div>
      </div>
      <Divider />

      {/* Sidebar Menu */}
      <div className="sidebar-content">
        <ul className="flex flex-col gap-1">
          {menuConfig.map((item, index) => (
            <div key={index}>
              <li>
                <MButton
                  title={item.title}
                  className={`${pathname === item.path && "!bg-[#e7e6e6d7]"}`}
                  startIcon={item.icon}
                  endIcon={
                    item.dropdown && (
                      <RiArrowDropDownLine
                        className={`text-xl transition-transform duration-300 ${
                          openDropdown === item.title
                            ? "rotate-180"
                            : "rotate-0"
                        }`}
                      />
                    )
                  }
                  onClick={
                    item.dropdown ? () => toggleDropdown(item.title) : undefined
                  }
                />

                {item.dropdown && (
                  <CollapablePanel
                    isOpened={openDropdown === item.title}
                    className="px-5"
                  >
                    {item.dropdown.map((sub, i) => (
                      <MButton
                        key={i}
                        className="!text-[13px] !font-[500]"
                        title={sub.title}
                        startIcon={sub.icon}
                      />
                    ))}
                  </CollapablePanel>
                )}
              </li>
              <Divider />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
