import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

const BannerSlider = ({ imageData }) => {
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
        className="mySwiper rounded-3xl"
      >
        {imageData?.map((data, i) => (
          <SwiperSlide key={i}>
            <Link to={data.link}>
              <img
                className="object-contain w-full"
                src={data.img}
                alt="Banner image"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default BannerSlider;
