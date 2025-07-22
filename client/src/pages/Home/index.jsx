import React from "react";
import BannerSlider from "../../components/BannerSlider";
import ItemSlider from "../../components/ItemSlider";
import iphone from "/Users/aryan/Desktop/Projects/e-comm images/iphonvar.jpg";
import fashion from "/Users/aryan/Desktop/Projects/e-comm images/pngegg.png";

const Home = () => {
  const images = [
    "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/1206619937a5421c.jpeg?q=60",
    "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/1206619937a5421c.jpeg?q=60",
    "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/1206619937a5421c.jpeg?q=60",
    "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/1206619937a5421c.jpeg?q=60",
  ];
  const items=[{
   name:"smartphone",
   image:iphone 
  },{
   name:"smartphone",
   image:iphone 
  },{
   name:"smartphone",
   image:iphone 
  },{
   name:"smartphone",
   image:iphone 
  },{
   name:"smartphone",
   image:iphone 
  },{
   name:"smartphone",
   image:iphone 
  },{
   name:"menwear",
   image:fashion 
  },{
   name:"smartphone",
   image:iphone 
  },{
   name:"smartphone",
   image:iphone 
  }]
  return (
    <div className="main-section bg-orange-200">
      <div className="w-[98%] mx-auto py-4 min-h-[20vh] -z-10">
        <BannerSlider images={images} />
      </div>
      <div className="w-[90%] mx-auto py-4 min-h-[20vh]">
        <ItemSlider items={items} />
      </div>

    </div>
  );
};

export default Home;
