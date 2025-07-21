import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaRegSquarePlus, FaRegSquareMinus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import DrawerItems from "./DrawerItems";

const DrawerNavigation = ({ isDrawerOpen, setDrawerOpen }) => {
    const items =[{
    name: "Fashion",
    subcategories: [
      {
        name: "Menwear",
        items: ["Shirts", "T-Shirts", "Jeans", "Shoes"]
      },
      {
        name: "Womenwear",
        items: ["Dresses", "Tops", "Skirts", "Heels"]
      },
      {
        name: "Accessories",
        items: ["Bags", "Belts", "Watches"]
      }
    ]
  },
  {
    name: "Electronics",
    subcategories: [
      {
        name: "Mobiles",
        items: ["iPhone", "Samsung Galaxy", "OnePlus"]
      },
      {
        name: "Laptops",
        items: ["MacBook", "Dell XPS", "HP Spectre"]
      },
      {
        name: "Headphones",
        items: ["AirPods", "Sony WH-1000XM5", "Bose QC45"]
      }
    ]
  },
  {
    name: "Home & Kitchen",
    subcategories: [
      {
        name: "Furniture",
        items: ["Sofas", "Beds", "Dining Tables"]
      },
      {
        name: "Appliances",
        items: ["Refrigerators", "Microwaves", "Mixers"]
      },
      {
        name: "Decor",
        items: ["Lamps", "Wall Art", "Clocks"]
      }
    ]
  },
  {
    name: "Sports",
    subcategories: [
      {
        name: "Outdoor",
        items: ["Tents", "Sleeping Bags", "Hiking Boots"]
      },
      {
        name: "Fitness",
        items: ["Yoga Mats", "Dumbbells", "Resistance Bands"]
      }
    ]
  }
];
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <div className="flex justify-between items-center px-2 py-2">
        <h3 className="text-xl">Shop by Categories</h3>
        <IoCloseCircleOutline
          className="cursor-pointer text-2xl"
          onClick={() => setDrawerOpen(false)}
        />
      </div>
      <Divider />
      <div className="drawer_items">
        <ul className=" flex flex-col gap-y-3 font-[600]">
         <DrawerItems items={items}/>
        </ul>
      </div>
    </Box>
  );

  return (
    <div>
      <Drawer open={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};
export default DrawerNavigation;
