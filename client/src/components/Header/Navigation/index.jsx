import React, { useState } from "react";
import { RiMenu3Line } from "react-icons/ri";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { IoRocketOutline } from "react-icons/io5";
import DrawerNavigation from "./Drawer";
import Level_2_CatMenu from "./Level_2_CatMenu";

const Navigation = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const MegaMenuData = [
    {
      name: "Fashion",
      subcategories: [
        {
          name: "Menwear",
          items: ["Shirts", "T-Shirts", "Jeans", "Shoes"],
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
  const [catIndex, setCatIndex] = useState(-1);
    const toggleLevel2Cat = (index) => {
      if(catIndex<0){
        setCatIndex(index);
      }else{
        setCatIndex(-1);
      }
    };

  return (
    <div className="max-w-[95%] mx-auto flex items-center">
      <div className="col_1 w-[23%]">
        <Button
          onClick={() => setDrawerOpen(true)}
          className="flex flex-row gap-x-2 !text-black"
        >
          <RiMenu3Line className="text-2xl" />
          Shop By Categories
          <MdOutlineKeyboardArrowDown className="text-2xl" />
        </Button>
      </div>
      <div className="col_2 w-[60%] mx-auto text-gray-500 z-10 relative">
        <ul className="flex gap-x-4 font-[500]">
          {MegaMenuData?.map((menuData, i) => (
            <li className="relative" key={`${i}_level_1_cat`}>
              <Link className="hover:text-primary" onMouseEnter={()=>toggleLevel2Cat(i)} onClick={()=>toggleLevel2Cat(i)}>
                {menuData.name}
              </Link>
              {catIndex===i && <Level_2_CatMenu level_2_cat={menuData.subcategories} />}
            </li>
          ))}

          {/* <Link to={"/category"} className='hover:text-primary'>Electronics</Link>
                <Link to={"/category"} className='hover:text-primary'>Beauty</Link>
                <Link to={"/category"} className='hover:text-primary'>Health Care</Link>
                <Link to={"/category"} className='hover:text-primary'>Kitchin</Link>
                <Link to={"/category"} className='hover:text-primary'>Fashion</Link>
                <Link to={"/category"} className='hover:text-primary'>Footwear</Link>
                <Link to={"/category"} className='hover:text-primary'>Groceries</Link>
                <Link to={"/category"} className='hover:text-primary'>Jwellery</Link> */}
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
