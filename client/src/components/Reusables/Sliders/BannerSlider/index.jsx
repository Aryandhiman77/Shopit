import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { EffectFade, Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

const BannerSlider = ({
  imageData = [],
  renderItem,
  spaceBetween = 30,
  slidesPerView = 1,
  slidesPerGroup = 1,
  fadeEffect = false,
  autoplay = {
    delay: 2500,
    disableOnInteraction: false,
  },
  loop = false,
  centeredSlides = true,
  disableButtons,
}) => {
  const swiperRef = useRef(null);
  return (
    <div
      onMouseEnter={() => swiperRef.current?.autoplay.stop()}
      onMouseLeave={() => swiperRef.current?.autoplay.start()}
    >
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        loop={loop}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        slidesPerGroup={slidesPerGroup}
        centeredSlides={centeredSlides}
        effect={fadeEffect ? "fade" : null}
        autoplay={autoplay}
        pagination={{
          clickable: true,
        }}
        navigation={disableButtons ? false : true}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="mySwiper rounded-3xl"
      >
        {imageData.map((item, i) => (
          <SwiperSlide key={i}>{renderItem(item)}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider;
