import React, { memo, useState } from "react";
import logo from "../../assets/admin-logo.jpg";
import { Divider } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Icons
import {
  MdOutlineAddBox,
  MdOutlineDashboard,
  MdSupervisedUserCircle,
} from "react-icons/md";
import { RiArrowDropDownLine, RiProductHuntLine } from "react-icons/ri";
import { PiSlideshowDuotone } from "react-icons/pi";
import {
  IoBagCheckOutline,
  IoEye,
  IoList,
  IoLogOutOutline,
  IoSettingsOutline,
  IoTrendingUpOutline,
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
    path: "/home-slides",
    dropdown: [
      { title: "Add Slide", icon: <BsPlus className="text-lg" />, path: "/add-slide" },
      { title: "View Slides", icon: <IoEye className="text-lg" />, path: "/view-slides" },
    ],
  },
  {
    title: "Users",
    icon: <MdSupervisedUserCircle className="text-xl" />,
    path: "/users",
  },
  {
    title: "Products",
    icon: <RiProductHuntLine className="text-xl" />,
    path: "/products",
    dropdown: [
      { title: "Product List", icon: <IoList className="text-lg" />, path: "/products" },
      { title: "Trending Products", icon: <IoTrendingUpOutline className="text-lg" />, path: "/trending-products" },
      { title: "Featured Products", icon: <FaBoxOpen className="text-lg" />, path: "/featured-products" },
      { title: "Add Product", icon: <MdOutlineAddBox className="text-lg" />, path: "/products/add" },
    ],
  },
  {
    title: "Categories",
    icon: <TbCategory className="text-xl" />,
    path: "/categories",
    dropdown: [
      { title: "Categories", icon: <MdOutlineDashboard className="text-lg" />, path: "/categories" },
      { title: "Level 2", icon: <MdOutlineDashboard className="text-lg" />, path: "/sub-categories" },
      { title: "Level 3", icon: <MdOutlineDashboard className="text-lg" />, path: "/leaf-categories" },
    ],
  },
  {
    title: "Orders",
    icon: <IoBagCheckOutline className="text-xl" />,
    path: "/orders",
  },
  {
    title: "Store Settings",
    icon: <IoSettingsOutline className="text-xl" />,
    path: "/settings",
  },
  {
    title: "Logout",
    icon: <IoLogOutOutline className="text-xl" />,
    path: "/logout",
  },
];

const SideBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (item) => {
    if (openDropdown === item.title) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(item.title);
      if (item.dropdown?.length > 0) {
        navigate(item.dropdown[0].path); 
      }
    }
  };

  const isParentActive = (item) => {
    if (pathname === item.path) return true;
    if (item.dropdown) {
      return item.dropdown.some((sub) => pathname === sub.path);
    }
    return false;
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

      <div className="sidebar-content">
        <ul className="flex flex-col gap-1">
          {menuConfig.map((item, index) => {
            const active = isParentActive(item);

            return (
              <div key={index}>
                <li>
                  <MButton
                    title={item.title}
                    className={`${active ? "!text-primary !border-l-[5px] !rounded-none" : ""}`}
                    startIcon={item.icon}
                    endIcon={
                      item.dropdown && (
                        <RiArrowDropDownLine
                          className={`text-xl transition-transform duration-300 ${
                            openDropdown === item.title ? "rotate-180" : "rotate-0"
                          }`}
                        />
                      )
                    }
                    onClick={
                      item.dropdown ? () => toggleDropdown(item) : () => navigate(item.path)
                    }
                  />

                  {item.dropdown && (
                    <CollapablePanel
                      isOpened={openDropdown === item.title || active}
                      className="px-5"
                    >
                      {item.dropdown.map((sub, i) => (
                        <Link to={sub.path} key={i}>
                          <MButton
                            className={`!text-[13px] !font-[500] ${pathname === sub.path ? "!text-primary" : ""}`}
                            title={sub.title}
                            startIcon={sub.icon}
                          />
                        </Link>
                      ))}
                    </CollapablePanel>
                  )}
                </li>
                <Divider />
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default memo(SideBar);
