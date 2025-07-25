import React, { useState } from "react";
import { Link } from "react-router-dom";
import Level_3_CatMenu from "./Level_3_CatMenu";
import Divider from "../../../Reusables/Elements/Divider";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
const Level_2_CatMenu = ({ level_2_cat = [] }) => {
  return (
    <div className="level_2_cat invisible font-[400] border-[1px] border-[#e5e5e5] absolute min-w-full bg-white top-[2.9rem] left-0 transition-all ease-linear">
      <div className="subcategories ">
        <ul className="z-10 flex flex-col min-w-[110px] w-[150px]">
          {level_2_cat?.map((cat, index) => (
            <div key={`${index}_level_2_cat`}>
              <li className="relative p-1 hover:font-[600]">
                <Link
                  className="flex p-1 items-center justify-between text-[15px]"
                  onClick={() => toggleLevel3Cat(index)}
                >
                  <p>{cat.name}</p>
                  <MdOutlineKeyboardArrowRight className="font-[900] text-xl" />
                </Link>
                <Level_3_CatMenu level_3_cat={cat?.items} />
              </li>
              <Divider width={1} bg={"#e5e5e5"} />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Level_2_CatMenu;
