import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "./style.css";

import { MdOutlineArrowLeft, MdOutlineArrowRight } from "react-icons/md";

const ItemSlider = ({ items = [] }) => {
  const swiperRef = useRef(null);

  return (
    <div className="w-full relative">
      {/* ✅ Custom Nav Buttons */}
      <div className="swiperbtns absolute z-10 top-0 w-full flex justify-between items-center h-full px-4 pointer-events-none">
        <button
          className="bg-[#d3d3cb] rounded-full shadow-2xl cursor-pointer active:scale-110 pointer-events-auto"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <MdOutlineArrowLeft className="text-3xl text-gray-700 hover:scale-[1.3] transition-all duration-100 ease-in-out" />
        </button>
        <button
          className="bg-[#d3d3cb] rounded-full shadow-2xl cursor-pointer active:scale-110 pointer-events-auto"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <MdOutlineArrowRight className="text-3xl text-gray-700 hover:scale-[1.3] transition-all duration-100 ease-in-out" />
        </button>
      </div>

      <Swiper
        slidesPerView={7}
        slidesPerGroup={4}
        spaceBetween={10}
        modules={[Navigation]}
        className="mySwiper"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {items.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="flex flex-col justify-center items-center p-3 gap-y-2 rounded-md bg-white">
              <img
                className="h-[150px] w-[150px] object-contain hover:scale-105 transition-all ease-in-out duration-250"
                src={item?.image}
                alt="Category image"
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
