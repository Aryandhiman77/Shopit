import React, { useContext, useEffect, useState } from "react";
import { RiMenu3Line } from "react-icons/ri";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { Link, useNavigation } from "react-router-dom";
import Button from "@mui/material/Button";
import { IoRocketOutline } from "react-icons/io5";
import DrawerNavigation from "./Drawer";
import Level_2_CatMenu from "./Level_2_CatMenu";
import "./style.css";
import DrawerList from "./Drawer/DrawerList";
import useData from "../../../hooks/useData";
import { SkeletonText } from "../../Reusables/Elements/Loader/skeleton";
import useAxios from "../../../hooks/useAxios";

const NavigationBar = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { getOrderedCategories, categories, loading } = useData();
  useEffect(() => {
    getOrderedCategories();
  }, []);
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
        <ul className="flex items-center gap-x-4 font-[500] level_1_cat text-black">
          <li className="relative !p-2 ">
            <Link to={"/"}>Home</Link>
          </li>
          {loading.allCategories ? (
            <>
              <li className="relative !p-2">
                <SkeletonText width="80px" />
              </li>
              <li className="relative !p-2">
                <SkeletonText width="100px" />
              </li>
              <li className="relative !p-2">
                <SkeletonText width="90px" />
              </li>
              <li className="relative !p-2">
                <SkeletonText width="70px" />
              </li>
            </>
          ) : (
            categories?.map((cat, i) => (
              <li
                className="relative !p-2 hover:font-[600]"
                key={`${i}_level_1_cat`}
              >
                <Link to={`/category/${cat?.slug}`} className="capitalize">
                  {cat?.name}
                </Link>
                <Level_2_CatMenu level_2_cat={cat?.subcategories} />
              </li>
            ))
          )}
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
      >
        <DrawerList setDrawerOpen={setDrawerOpen} />
      </DrawerNavigation>
    </div>
  );
};

export default NavigationBar;
