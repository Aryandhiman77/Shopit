import React from "react";
import BannerSlider from "../../components/BannerSlider";
import ItemSlider from "../../components/ItemSlider";
import iphone from "/Users/aryan/Desktop/Projects/e-comm images/iphonvar.jpg";
import fashion from "/Users/aryan/Desktop/Projects/e-comm images/pngegg.png";

const Home = () => {
  const imageData = [
    {img:"https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/1206619937a5421c.jpeg?q=60",
      link:"https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/1206619937a5421c.jpeg?q=60"},
    {img:"https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/1206619937a5421c.jpeg?q=60",
      link:"https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/1206619937a5421c.jpeg?q=60"},{img:"https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/1206619937a5421c.jpeg?q=60",
      link:"https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/1206619937a5421c.jpeg?q=60"},{img:"https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/1206619937a5421c.jpeg?q=60",
      link:"https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/1206619937a5421c.jpeg?q=60"},
  ];
  const popularCategories=[{
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
        <BannerSlider imageData={imageData} />
      </div>
      <div className="w-[90%] mx-auto py-4 min-h-[20vh]">
        <ItemSlider items={popularCategories} /> 
      </div>

    </div>
  );
};

export default Home;
