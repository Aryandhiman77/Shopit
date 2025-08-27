import { useState } from "react";

const SizeVariantList = ({ items,defaultActive=0,getActive=()=>{}}) => {
    const [active,setActive] =useState(defaultActive);
    const makeActive =(i)=>{
        setActive(i);
        getActive(i);
    }
  return (
    <div className="flex gap-2">
      {items?.map((item, i) => (
        <button
        onClick={()=>makeActive(i)}
          key={i}
          className={`border-[1px] border-gray-300 p-2 cursor-pointer rounded-md text-sm 
            ${active === i ? "font-[600] bg-primary text-white":" font-[400] hover:bg-[#e5e5e5] "}`}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default SizeVariantList;
