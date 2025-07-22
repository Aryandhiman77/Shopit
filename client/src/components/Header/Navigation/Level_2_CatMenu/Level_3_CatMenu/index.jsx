
import React from "react";
import { Link } from "react-router-dom";
import Divider from "../../../../Divider";

const Level_3_CatMenu = ({ level_3_cat }) => {
  
  return (
    <div className="level_3_cat invisible absolute min-w-[110px] w-[200px] left-[102%] top-0 border-[1px] border-[#e5e5e5]  bg-white  transition-all">
      <ul className="z-10 flex flex-col">
        {level_3_cat?.map((cat, i) => (
          <div key={`${i}_level_2_cat`}>
            <li className="p-1" >
              <Link >{cat}</Link>
            </li>
            <Divider width={1} bg={"#e5e5e5"} />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Level_3_CatMenu;
