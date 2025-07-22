import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import image from "/Users/aryan/Desktop/Projects/e-comm images/iphonvar.jpg";

// import required modules
import { Navigation } from "swiper/modules";
const ItemSlider = ({ items = [] }) => {
  return (
    <div className="w-full">
      <Swiper
        slidesPerView={6}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {items.map((item, i) => (
          <SwiperSlide>
            <div className="flex flex-col justify-center items-center p-2 border-[1.5px] border-gray-300 gap-y-2 rounded-xl">
              <img className="h-[150px] w-[150px] object-contain" src={item?.image} alt="" />
              <p className="text-[1rem]">{item.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ItemSlider;
