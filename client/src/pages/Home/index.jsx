import React, { useContext } from "react";
import BannerSlider from "../../components/BannerSlider";
import ItemSlider from "../../components/ItemSlider";
import iphone from "/Users/aryan/Desktop/Projects/e-comm images/iphonvar.jpg";
import fashion from "/Users/aryan/Desktop/Projects/e-comm images/pngegg.png";
import ScrollTab from "../../components/ScrollTab";
import { DataContext } from "../../context/DataProvider";
import ProductItem from "../../components/ProductItem";

const Home = () => {
  const {categories} = useContext(DataContext);
  const imageData = [
    {
      img: "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/1206619937a5421c.jpeg?q=60",
      link: "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/1206619937a5421c.jpeg?q=60",
    },
    {
      img: "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/1206619937a5421c.jpeg?q=60",
      link: "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/1206619937a5421c.jpeg?q=60",
    },
    {
      img: "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/1206619937a5421c.jpeg?q=60",
      link: "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/1206619937a5421c.jpeg?q=60",
    },
    {
      img: "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/1206619937a5421c.jpeg?q=60",
      link: "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/1206619937a5421c.jpeg?q=60",
    },
  ];
  const popularCategories = [
    {
      name: "Fashion",
      image: "https://static.vecteezy.com/system/resources/previews/003/621/306/non_2x/beautiful-fashion-woman-in-sunglasses-stylish-girl-from-multicolored-paints-splash-of-watercolor-colored-drawing-realistic-illustration-of-paints-vector.jpg",
    },
    {
      name: "Electronics",
      image: "https://www.matric.com/hubfs/classes%20of%20electronics.jpg",
    },
    {
      name: "Home & Furniture",
      image: "https://png.pngtree.com/png-clipart/20240811/original/pngtree-a-lamp-on-table-with-chair-png-image_15751370.png",
    },
    {
      name: "Sports",
      image: "https://img.freepik.com/free-vector/soccer-volleyball-baseball-rugby-equipment_1441-4026.jpg",
    },
    {
      name: "Grocery",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwUNj-DZTMUW0XoNJZBFp3fQNr8hcO3sB-Qg&s",
    },
    {
      name: "Jwellery",
      image: "https://gravity-apps.com/cmspro/wp-content/uploads4953//2023/09/handcrafted-jewellery.jpg",
    },
    {
      name: "menwear",
      image: fashion,
    },
    {
      name: "smartphone",
      image: iphone,
    },
    {
      name: "smartphone",
      image: iphone,
    },
  ];
  return (
    <div className="wrapper">
      <section className="main-section bg-[#e7eaff]">
        <div className="w-[98%] mx-auto py-4 min-h-[20vh] -z-10">
          <BannerSlider imageData={imageData} />
        </div>
        <div className="w-[90%] mx-auto py-4 min-h-[20vh]">
          <ItemSlider items={popularCategories} />
        </div>
      </section>
      <section className="product&banner-section h-[100vh] bg-white p-10 mx-auto">
        <div className="product-section">
          <div className="header-section flex justify-between">
            <div>
            <p className="text-xl font-[600]">Featured Products</p>
            <p className="text-sm font-[400]">Don't miss the current offers until the end of Season.</p>
            </div>
            <ScrollTab items={categories}/>
          </div>
          <div className="product-list mt-8 flex gap-x-5">
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
           
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
