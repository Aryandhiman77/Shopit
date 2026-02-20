import React, { memo, useState } from "react";
import logo from "../../../assets/logo.svg";
import { Divider } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Icons
import {
  MdOutlineAddBox,
  MdOutlineDashboard,
  MdOutlineSupportAgent,
  MdSupervisedUserCircle,
} from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { PiSlideshowDuotone } from "react-icons/pi";
import {
  IoBagCheckOutline,
  IoEye,
  IoList,
  IoLogOutOutline,
  IoSettingsOutline,
  IoTrendingUpOutline,
} from "react-icons/io5";
import { TbBrandSass, TbCategory } from "react-icons/tb";
import { FaBoxOpen } from "react-icons/fa6";
import { BsPlus } from "react-icons/bs";

// Components
import MButton from "../../../components/Reusables/Elements/MButton";
import CollapablePanel from "../../../components/Reusables/CollapsablePanel";
import PanelLogo from "../../../components/Reusables/Logo";
import {
  LayoutDashboardIcon,
  List,
  PackageIcon,
  ShoppingBag,
  User2Icon,
  UserCheck,
} from "lucide-react";

// Sidebar configuration
const menuConfig = [
  {
    title: "Dashboard",
    icon: <LayoutDashboardIcon size={20} />,
    path: "/",
  },

  {
    title: "Users",
    icon: <User2Icon size={20} />,
    path: "/users",
  },
  {
    title: "Orders",
    icon: <ShoppingBag size={20} />,
    path: "/orders",
  },
  {
    title: "Products",
    icon: <PackageIcon size={20} />,
    path: "/products",
    dropdown: [
      {
        title: "Product List",
        icon: <IoList className="text-lg" />,
        path: "/products",
      },
      {
        title: "Add Product",
        icon: <MdOutlineAddBox className="text-lg" />,
        path: "/products/add",
      },
      {
        title: "Trending Products",
        icon: <IoTrendingUpOutline className="text-lg" />,
        path: "/trending-products",
      },
      {
        title: "Featured Products",
        icon: <FaBoxOpen className="text-lg" />,
        path: "/featured-products",
      },
    ],
  },
  {
    title: "Brands",
    icon: <TbBrandSass className="text-xl" />,
    path: "/brands",
    dropdown: [
      {
        title: "Create Brand",
        icon: <IoList className="text-lg" />,
        path: "/create-brand-request",
      },
      {
        title: "Brands Requests",
        icon: <IoList className="text-lg" />,
        path: "/brand-requests",
      },
      {
        title: "My brands",
        icon: <MdOutlineDashboard className="text-lg" />,
        path: "/seller-brands",
      },
    ],
  },
  {
    title: "Activity",
    icon: <UserCheck size={20} />,
    path: "/orders",
  },
  {
    title: "Customer Support",
    icon: <MdOutlineSupportAgent className="text-xl" />,
    path: "/orders",
  },
  {
    title: "Settings",
    icon: <IoSettingsOutline className="text-xl" />,
    path: "/settings",
  },
];

const SideBar = () => {
  const getSideRouteIndex = 0;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (item) => {
    if (openDropdown === item.title) {
      setOpenDropdown(null); // close dropdown if it's open
    } else {
      setOpenDropdown(item.title); // open dropdown
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
    <div className="bg-white w-full sticky top-0 dark:bg-gray-900! dark:text-white! ">
      {/* Logo */}
      <div className="logo">
        <PanelLogo />
      </div>
      <Divider className="dark:bg-gray-500" />

      <div className="sidebar-content">
        <ul className="flex flex-col gap-1">
          {menuConfig.map((item, index) => {
            const active = isParentActive(item);

            return (
              <div key={index}>
                <li>
                  <MButton
                    title={item.title}
                    className={`dark:bg-gray-900! dark:text-white! ${
                      active
                        ? "text-primary! border-l-[5px]! rounded-none!"
                        : ""
                    }`}
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
                      item.dropdown
                        ? () => toggleDropdown(item)
                        : () => navigate(item.path)
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
                            className={`dark:bg-gray-900! dark:text-gray-400 text-[13px]! font-medium! ${
                              pathname === sub.path ? "text-primary!" : ""
                            }`}
                            title={sub.title}
                            startIcon={sub.icon}
                          />
                        </Link>
                      ))}
                    </CollapablePanel>
                  )}
                </li>
                <Divider className="dark:bg-gray-500" />
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default memo(SideBar);
