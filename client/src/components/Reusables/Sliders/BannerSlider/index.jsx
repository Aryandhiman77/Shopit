import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectFade, Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

const BannerSlider = ({
  imageData = [],
  renderItem,
  spaceBetween = 30,
  slidesPerView=1,
  slidesPerGroup=1,
  fadeEffect=false,
  autoplay={
          delay: 2500,
          disableOnInteraction: false,
        },
        loop=false
}) => {
  return (
    <>
      <Swiper
      loop={loop}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        slidesPerGroup={slidesPerGroup}
        centeredSlides={true}
        effect={fadeEffect?true:null}   
        fadeEffect={{ crossFade: true }}
        autoplay={autoplay}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="mySwiper rounded-3xl"
      >
        {imageData.map((item, i) => (
          <SwiperSlide key={i}>{renderItem(item)}</SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default BannerSlider;
