import React, { useRef } from "react";
import {Swiper, SwiperSlide, useSwiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./style.css";
// import required modules
import { Navigation } from "swiper/modules";
import { MdOutlineArrowLeft, MdOutlineArrowRight } from "react-icons/md";
import Button from "@mui/material/Button";

const ItemSlider = ({ items = [] }) => {
  const swiperRef = useRef(null);
  return (
    <div className="w-full">
      <Swiper
        slidesPerView={7}
        spaceBetween={10}
        slidesPerGroup={4}
        modules={[Navigation]}
        className="mySwiper"
        onSwiper={(swiper)=>(swiperRef.current = swiper)}
      >
        <div className="swiperbtns absolute z-20 top-0 w-full flex justify-between items-center h-full px-4">
          <butto
            className="bg-[#d3d3cb] rounded-full shadow-2xl cursor-pointer active:scale-110"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <MdOutlineArrowLeft className="text-3xl text-gray-700 hover:scale-[1.3] transition-all duration-100 ease-in-out" />
          </butto>
          <button
            className="bg-[#d3d3cb] rounded-full shadow-2xl cursor-pointer active:scale-110"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <MdOutlineArrowRight className="text-3xl text-gray-700 hover:scale-[1.3] transition-all duration-100 ease-in-out" />
          </button>
          
        </div>
        {items.map((item, i) => (
          <SwiperSlide>
            <div className="flex flex-col justify-center items-center p-3 gap-y-2 rounded-md bg-white">
              <img
                className="h-[150px] w-[150px] object-contain hover:scale-105 transition-all ease-in-out duration-250"
                src={item?.image}
                alt=""
              />
              <p className="text-[1rem]">{item.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ItemSlider;
