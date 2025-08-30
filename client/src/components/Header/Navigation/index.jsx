import React, { useContext, useState } from "react";
import { RiMenu3Line } from "react-icons/ri";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { IoRocketOutline } from "react-icons/io5";
import DrawerNavigation from "./Drawer";
import Level_2_CatMenu from "./Level_2_CatMenu";
import "./style.css";
import DataContext from "../../../context/DataContext";
import DrawerList from "./Drawer/DrawerList";


const NavigationBar = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const {categories} = useContext(DataContext);
  

  return (
    <div className="max-w-[95%] mx-auto flex items-center ">
      <div className="col_1 w-[23%]">
        <Button
          onClick={() => setDrawerOpen(true)}
          className="flex flex-row gap-x-2 !text-black !p-2"
        >
          <RiMenu3Line className="text-2xl" />
          Shop By Categories
          {isDrawerOpen ? (
            <MdOutlineKeyboardArrowLeft className="text-2xl" />
          ) : (
            <MdOutlineKeyboardArrowRight className="text-2xl" />
          )}
        </Button>
      </div>
      <div className="col_2 w-[60%] mx-auto text-gray-500 z-10 relative">
        <ul className="flex gap-x-4 font-[500] level_1_cat text-black">
          <li className="relative !p-2 ">
              <Link to={"/"}>Home</Link>
            </li>
          {categories?.map((menuData, i) => (
            <li className="relative !p-2 hover:font-[600]" key={`${i}_level_1_cat`}>
              <Link>{menuData.name}</Link>
              <Level_2_CatMenu level_2_cat={menuData.subcategories} />
            </li>
          ))}
        </ul>
      </div>
      <div className="info flex items-center gap-x-2 w-[17%] text-gray-500 font-[400]">
        <IoRocketOutline className="text-xl" />
        Free all india delivery
      </div>
      <DrawerNavigation
        isDrawerOpen={isDrawerOpen}
        setDrawerOpen={setDrawerOpen}
        anchor={"left"}
        ><DrawerList setDrawerOpen={setDrawerOpen}/></DrawerNavigation>
    </div>
  );
};

export default NavigationBar;
