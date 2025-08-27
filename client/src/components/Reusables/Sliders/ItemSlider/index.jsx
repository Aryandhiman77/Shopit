import { memo, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "./style.css";

import { MdOutlineArrowLeft, MdOutlineArrowRight } from "react-icons/md";
import { IoIosArrowUp,IoIosArrowDown } from "react-icons/io";

import { Link } from "react-router-dom";

const ItemSlider = ({
  items = [],
  renderItem,
  slidesPerView = 7,
  slidesPerGroup = 1,
  spaceBetween = 0,
  breakpoints,
  direction,
  slidesOffsetBefore,
  slidesOffsetAfter
}) => {
  const swiperRef = useRef(null);
  const breaks = breakpoints?{
    
          // when window width is >= 640px
          300: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 4,
            slidesPerGroup: 2,
          },
          850:{
            slidesPerView: 4,
            slidesPerGroup: 2,
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: 5,
            slidesPerGroup: 2,
          },
          1130:{
            slidesPerView: 6,
            slidesPerGroup: 3,
          }
        }:null
  return (
    <div className="w-full relative">
      {
        direction==="vertical"?
        <div className="swiperbtns absolute z-10 top-0 w-full flex flex-col justify-between items-center h-full pointer-events-none">
        <button
          className="bg-[#d2d2d2c2] group hover:bg-primary text-[#aaaaaa] w-full shadow-2xl cursor-pointer active:scale-110 pointer-events-auto " 
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <IoIosArrowUp
            className={` group-hover:text-white text-[2rem] text-primary group-hover:scale-[1.3] transition-all duration-200 ease-in-out mx-auto`}
          />
        </button>
        <button
          className="bg-[#d2d2d2c2] group hover:bg-primary text-[#aaaaaa] w-full shadow-2xl cursor-pointer active:scale-110 pointer-events-auto"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <IoIosArrowDown
            className={` group-hover:text-white text-[2rem] text-primary group-hover:scale-[1.3] transition-all duration-200 ease-in-out mx-auto`}
          />
        </button>
      </div>
        :  <div className="swiperbtns absolute z-10 top-0 w-full flex justify-between items-center h-full px-4 pointer-events-none">
        <button
          className="bg-[#d3d3cb] rounded-full shadow-2xl cursor-pointer active:scale-110 pointer-events-auto"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <MdOutlineArrowLeft
            className={`text-[2rem] text-gray-700 hover:scale-[1.3] transition-all duration-100 ease-in-out`}
          />
        </button>
        <button
          className="bg-[#d3d3cb] rounded-full shadow-2xl cursor-pointer active:scale-110 pointer-events-auto"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <MdOutlineArrowRight
            className={`text-[2rem] text-gray-700 hover:scale-[1.3] transition-all duration-100 ease-in-out`}
          />
        </button>
      </div>
      }
    
    
      <Swiper
       direction={direction}
        slidesPerView={slidesPerView}
        slidesPerGroup={slidesPerGroup}
        spaceBetween={spaceBetween}
        slidesOffsetBefore={slidesOffsetBefore}
        slidesOffsetAfter={slidesOffsetAfter}
        modules={[Navigation]}
        className={`mySwiper  ${direction==="vertical"?"!h-[60vh] mt-2 p-2":"!px-3 !py-4"}`}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        breakpoints={breaks}
      >
        {items.map((item, i) => (
          <SwiperSlide key={i}>{renderItem(item)}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ItemSlider;
