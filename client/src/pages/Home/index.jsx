import React from "react";
import BannerSlider from "../../components/BannerSlider";

const Home = () => {
  const images = [
    "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/1206619937a5421c.jpeg?q=60",
    "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/1206619937a5421c.jpeg?q=60",
    "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/1206619937a5421c.jpeg?q=60",
    "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/1206619937a5421c.jpeg?q=60",
  ];
  return (
    <div>
      <div className="w-[98%] mx-auto pt-4 min-h-[20vh">
        <BannerSlider images={images} />
      </div>
      
    </div>
  );
};

export default Home;
