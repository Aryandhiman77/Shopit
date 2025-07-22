
import React from "react";
import { Link } from "react-router-dom";
import Divider from "../../../../Divider";

const Level_3_CatMenu = ({ level_3_cat }) => {
  
  return (
    <div className="absolute min-w-[120%] left-[100%] top-0 border-[1px] border-[#e5e5e5]  bg-white">
      <ul className="z-10 flex flex-col gap-y-1 w-full">
        {level_3_cat?.map((cat, i) => (
          <div key={`${i}_level_2_cat`}>
            <li >
              <Link className="p-3">{cat}</Link>
            </li>
            <Divider width={1} bg={"#e5e5e5"} />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Level_3_CatMenu;
