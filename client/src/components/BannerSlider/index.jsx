import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const BannerSlider = ({ images = [] }) => {
  return (
    <>
      <Swiper
        spaceBetween={30}
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
        className="mySwiper"
      >
        {images.map((image, i) => (
          <SwiperSlide key={i}>
            <img
              className="rounded-3xl object-cover w-full"
              src={image}
              alt="Banner image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default BannerSlider;
