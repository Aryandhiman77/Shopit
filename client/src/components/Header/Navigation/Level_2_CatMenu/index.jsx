import React, { useState } from "react";
import { Link } from "react-router-dom";
import Level_3_CatMenu from "./Level_3_CatMenu";
import Divider from "../../../Divider";

const Level_2_CatMenu = ({ level_2_cat = [] }) => {
  const [catIndex, setCatIndex] = useState(-1);
  const toggleLevel3Cat = (index) => {
    if(catIndex<0 || catIndex>0){
      setCatIndex(index);
    }else{
      setCatIndex(-1);
    }
  };

  return (
    <div className="border-[1px] border-[#e5e5e5] absolute min-w-full bg-white top-[1.9rem]">
      <div className="subcategories">
        <ul className="z-10 flex flex-col gap-y-1">
          {level_2_cat?.map((cat, index) => (
            <div key={`${index}_level_2_cat`}>
              <li className="relative">
                <Link
                  className="p-3"
                  onMouseEnter={()=>toggleLevel3Cat(index)} 
                  onClick={()=>toggleLevel3Cat(index)}
                >
                  {cat.name}
                </Link>
               { catIndex===index && <Level_3_CatMenu level_3_cat={cat?.items} />}
              </li>
              <Divider width={1} bg={"#e5e5e5"} />
              {/* <div className="h-[1px] w-full bg-[#e5e5e5]"></div> */}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Level_2_CatMenu;
