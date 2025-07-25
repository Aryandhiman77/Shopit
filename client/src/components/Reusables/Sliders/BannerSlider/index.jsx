import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

const BannerSlider = ({ imageData=[],renderItem,spaceBetween=30,slidesPerView,slidesPerGroup}) => {
  return (
    <>
      <Swiper
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        slidesPerGroup={slidesPerGroup}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper rounded-3xl"
      >
        {imageData.map((item, i) => (
          <SwiperSlide key={i}>
             {renderItem(item)}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default BannerSlider;
