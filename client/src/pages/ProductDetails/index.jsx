import React, { useContext, useEffect } from "react";
import ImageZoom from "../../components/Reusables/ImageZoom";
import { useParams } from "react-router-dom";
import ItemSlider from "../../components/Reusables/Sliders/ItemSlider";
import { Swiper, SwiperSlide } from "swiper/react";
import BreadCrumb from "../../components/Reusables/BreadCrumb";
import "./style.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Rating from "@mui/material/Rating";
import Price from "../../components/Reusables/Items/ProductItem/Price";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { MdShoppingCart } from "react-icons/md";
import ScrollTab from "../../components/Reusables/ScrollTab";
import ProductItem from "../../components/Reusables/Items/ProductItem";
import DataContext from "../../context/DataContext";
import QuantityBox from "../../components/Reusables/QuantityBox";
import AdditionalProductInformation from "./AdditionalProductInfo";

const ProductDetails = () => {
  const { slug } = useParams();
  const { productsData } = useContext(DataContext);
  useEffect(()=>{
    console.log("rerendering..")
  },[])
  const imagesData = [
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
  ];
  return (
    <div>
      <div className="flex justify-between w-full bg-[#e5e5e5]">
        <BreadCrumb />
        <label
          htmlFor="compare"
          className="flex items-center gap-3 pr-5 text-sm"
        >
          Compare
          <input type="checkbox" id="compare" />
        </label>
      </div>
      <div className="flex flex-row gap-4 p-2">
        <div className="gallery">
          <ItemSlider
          slidesOffsetBefore={40}
          slidesOffsetAfter={40}
            direction={"vertical"}
            slidesPerView={5}
            slidesPerGroup={1}
            spaceBetween={0}
            items={imagesData}
            breakpoints={false}
            renderItem={(src, i) => (
              <img
                key={i}
                className="h-20 w-auto object-cover border-[1px] border-black rounded-xl"
                src={src}
                alt=""
              />
            )}
          />
        </div>
        <ImageZoom
          image={
            imagesData[3]
          }
        >
          <div className="flex flex-col gap-2 m-2 relative z-20">
            <div className="heading font-[600] text-3xl text-gray-700">
              iPhone 15 pro max
            </div>
            <div className="flex gap-1 items-center">
              <div className="brand  text-lg ">
                <span className="text-gray-500 font-[400]">Brand: </span>
                <span className="font-[500]">Apple.inc </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <Price mrp={5000} sellingPrice={3000} textSize={"text-[20px]"} />
              <div className="flex flex-col justify-center items-center pr-10">
                <Rating
                  value={4.6}
                  precision={0.1}
                  readOnly
                  className="!text-blue-800"
                />
                <span className="text-gray-500 font-[400]">
                  {Number(189900).toLocaleString()} reviews
                </span>
              </div>
            </div>
            <Divider />
            <div className="mini-description text-gray-500 font-[400] my-4 line-clamp-3">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus
              perspiciatis distinctio exercitationem nisi. Autem natus error
              exercitationem architecto vitae sunt cumque qui at reprehenderit.
              Tenetur debitis aut perferendis provident esse dolorum saepe hic
              iusto,
            </div>
            <Divider />
            <div className="keyValueDetails flex flex-col gap-3">
              <p className="stock">
                <span className=" font-[500] text-md">
                  Available in Stock:{" "}
                </span>
                <span className="text-green-600 font-[600]">147 Items </span>
              </p>
              <div className="size flex flex-col gap-2">
                <div>
                  <span className=" font-[500] text-md">Size: </span>
                  <span className="text-gray-700 font-[600]"> Small </span>
                </div>
                <div className="flex gap-2">
                  <div className="font-[600] border-[1px] border-gray-300 p-2 text-white bg-primary rounded-md text-sm">
                    Small
                  </div>
                  <div className="font-[400] border-[1px] border-gray-300 p-2 hover:bg-[#e5e5e5] cursor-pointer rounded-md text-sm">
                    Medium
                  </div>
                  <div className="font-[400] border-[1px] border-gray-300 p-2 hover:bg-[#e5e5e5] cursor-pointer rounded-md text-sm">
                    Lage
                  </div>
                  <div className="font-[400] border-[1px] border-gray-300 p-2 hover:bg-[#e5e5e5] cursor-pointer rounded-md text-sm">
                    XL
                  </div>
                  <div className="font-[400] border-[1px] border-gray-300 p-2 hover:bg-[#e5e5e5] cursor-pointer rounded-md text-sm">
                    XXL
                  </div>
                </div>
              </div>
              <div className="color-variants flex   gap-2 flex-col">
                <span className=" font-[500] text-md">Color: </span>
                <div className="flex gap-2">
                  <div className="box h-10 w-10 bg-amber-500 rounded-full"></div>
                  <div className="box h-10 w-10 bg-red-500 rounded-full"></div>
                  <div className="box h-10 w-10 bg-pink-500 rounded-full"></div>
                </div>
              </div>
              <p className="shipping-info">
                <span className=" font-[500] text-sm text-gray-600">
                  Free Shipping (Est. Delivery time 2-3 Days)
                </span>
              </p>
              <div className="addtoCart flex gap-4">
                <QuantityBox/>
                <Button className="!bg-primary !text-white w-1/4 flex items-center gap-2">
                  <MdShoppingCart className="text-xl" />
                  <p> Add To Cart</p>
                </Button>
              </div>
            </div>
          </div>
        </ImageZoom>
      </div>
      <div className="additional-details w-full p-3 bg-white">
        <AdditionalProductInformation/>
      </div>
      <div className="product-section mt-4 bg-white p-5">
        <div className="header-section flex justify-between ">
          <p className="text-xl font-[600] px-5 text-gray-600">
            Related Products
          </p>
          <Button className="!text-primary">
            View all
          </Button>
        </div>
        <div className="product-list mt-2">
          <ItemSlider
            slidesPerView={6}
            slidesPerGroup={4}
            spaceBetween={10}
            items={productsData}
            breakpoints={true}
            renderItem={(item) => <ProductItem item={item} />}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
