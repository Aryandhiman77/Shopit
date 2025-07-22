import React, { useState } from "react";
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

const Navigation = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const MegaMenuData = [
    {
      name: "Fashion",
      subcategories: [
        {
          name: "Menwear",
          items: ["Shirts", "T-Shirts", "Jeans", "Shoes","Formals"],
        },
        {
          name: "Womenwear",
          items: ["Dresses", "Tops", "Skirts", "Heels"],
        },
        {
          name: "Accessories",
          items: ["Bags", "Belts", "Watches"],
        },
      ],
    },
    {
      name: "Electronics",
      subcategories: [
        {
          name: "Mobiles",
          items: ["iPhone", "Samsung Galaxy", "OnePlus"],
        },
        {
          name: "Laptops",
          items: ["MacBook", "Dell XPS", "HP Spectre"],
        },
        {
          name: "Headphones",
          items: ["AirPods", "Sony WH-1000XM5", "Bose QC45"],
        },
      ],
    },
    {
      name: "Home & Kitchen",
      subcategories: [
        {
          name: "Furniture",
          items: ["Sofas", "Beds", "Dining Tables"],
        },
        {
          name: "Appliances",
          items: ["Refrigerators", "Microwaves", "Mixers"],
        },
        {
          name: "Decor",
          items: ["Lamps", "Wall Art", "Clocks"],
        },
      ],
    },
    {
      name: "Sports",
      subcategories: [
        {
          name: "Outdoor",
          items: ["Tents", "Sleeping Bags", "Hiking Boots"],
        },
        {
          name: "Fitness",
          items: ["Yoga Mats", "Dumbbells", "Resistance Bands"],
        },
      ],
    },
  ];

  return (
    <div className="max-w-[95%] mx-auto flex items-center">
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
        <ul className="flex gap-x-4 font-[500] level_1_cat">
          {MegaMenuData?.map((menuData, i) => (
            <li className="relative !p-2 " key={`${i}_level_1_cat`}>
              <Link className="font-[600]">{menuData.name}</Link>
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
        position={"left"}
      />
    </div>
  );
};

export default Navigation;
