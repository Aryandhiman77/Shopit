import Badge from "../../Elements/Badge";
import Rating from "@mui/material/Rating";
import { MdArrowDownward } from "react-icons/md";
import { data, Link } from "react-router-dom";
import { GiExpand } from "react-icons/gi";
import "./style.css"
import { IoCartOutline, IoGitCompareOutline, IoHeartOutline } from 'react-icons/io5';
import GetRating from "./rating";
const ProductItem = ({ info}) => { 
  return (
    <Link className="product-item min-w-[12.5vw] max-w-[20rem] shadow-lg flex justify-around flex-col items-center border-[1px] border-[#e5e5e5] transition-all duration-200 ease-in-out rounded-lg relative overflow-hidden -z-10 w-full">
      <div className="overflow-hidden block rounded-t-lg ">
      <img
        className="h-full w-full hover:scale-110 transition-all ease-in-out duration-500 object-contain"
        width={400}
        height={600}
        src={info}
        alt=""
      />
      </div>
      <div className="details p-2 w-full">
        <p className="text-black text-[13px] font-[500]">Iphone 16 black</p>
        <p className="text-black text-[13px] line-clamp-2">
          Apple iPhone 16 black, mat back, A18 chipset, dolby visionasfassldafjksdajfljsaklfjlfjaslfjslajflasjlkfjssfkjasklfjklsajfklsj
        </p>
        <div className="flex items-center gap-x-1 w-full pr-2 rounded-lg">
          {/* <Rating
            value={4.7}
            precision={0.1}
            size="small"
            readOnly
            className="py-2 !text-red-600"
          /> */}
          {
            GetRating(4.6)
          }
          <p className="text-sm text-gray-400">(880)</p>
        </div>
        <div className="flex flex-row gap-x-3 font-[system-ui]">
          <p className="text-sm line-through text-gray-400">₹ 12,150</p>
          <p className="text-sm font-semibold text-primary">₹3,999</p>
        </div>
      </div>
      <div className="discount-icons absolute top-2 -left-4 !text-[12px] transition-all duration-300 ease-in-out ">
         <Badge value={`20%`} size={1} color="bg-primary"/>
      </div>
      <div className="right-icons absolute -top-40 right-3 !text-[12px] space-y-2 transition-all duration-300 ease-in-out opacity-[0.9] ">
        <GiExpand className="icon-hover border-[1px] rounded-full p-[5px] text-center text-3xl bg-white border-gray-200 hover:bg-primary hover:text-white"/>
        <IoGitCompareOutline className="icon-hover border-[1px] rounded-full p-[4px] text-center text-3xl bg-white border-gray-200 hover:bg-primary hover:text-white"/>
        <IoHeartOutline className="icon-hover border-[1px] rounded-full p-[4px] text-center text-3xl bg-white border-gray-200 hover:bg-primary hover:text-white "/>
      </div>
      
    </Link>
    
  );
};

export default ProductItem;
