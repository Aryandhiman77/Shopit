import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "./style.css";

import { MdOutlineArrowLeft, MdOutlineArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

const ItemSlider = ({
  items = [],
  renderItem,
  slidesPerView = 7,
  slidesPerGroup = 1,
  spaceBetween = 0,
  breakpoints
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
          // when window width is >= 1024px
          1024: {
            slidesPerView: 6,
            slidesPerGroup: 3,
          },
        }:null

  return (
    <div className="w-full relative">
      <div className="swiperbtns absolute z-10 top-0 w-full flex justify-between items-center h-full px-4 pointer-events-none">
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

      <Swiper
        slidesPerView={slidesPerView}
        slidesPerGroup={slidesPerGroup}
        spaceBetween={spaceBetween}
        modules={[Navigation]}
        className="mySwiper !px-3 !py-4"
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
