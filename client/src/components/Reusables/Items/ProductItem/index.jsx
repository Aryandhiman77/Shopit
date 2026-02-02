import Badge from "../../Elements/Badge";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import { GiExpand } from "react-icons/gi";
import "./style.css";
import {
  IoCartOutline,
  IoGitCompareOutline,
  IoHeartOutline,
} from "react-icons/io5";
import GetRating from "./rating";
import Button from "@mui/material/Button";
import { memo, useState } from "react";
import Price from "./Price";
import ProductModal from "../../Modal";
import Gallery from "../../../../pages/ProductDetails/Gallery";
import Divider from "@mui/material/Divider";
import SizeVariantList from "../../SizeVariantList";
import QuantityBox from "../../QuantityBox";
import { MdShoppingCart } from "react-icons/md";
import SkeletonImage, { SkeletonText } from "../../Elements/Loader/skeleton";
import ProductSkeleton from "./ProductSkeleton";
const ProductItem = ({ item, horizontal = false, loading }) => {
  const smText = horizontal ? "text-lg" : "text-sm";
  const lgText = horizontal ? "text-2xl" : "text-lg";
  const [isModalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const imagesData = [
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://www.zdnet.com/a/img/resize/7c135e7748ad80aa72743c58c1d067ba1a0fddcf/2023/10/06/4e7663f4-fe43-424e-8fde-64a5612cdfd7/img-1950.jpg?auto=webp&width=1280",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT31y7OlfN7OpPHPLzl_2MDPNAw9V6fjLUeIg&s",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
  ];
  const [activeThum, setActiveThumb] = useState(imagesData[0]);
  return (
    <div className={`product-item ${horizontal ? "list-view" : "grid-view"}`}>
      <div className="overflow-hidden block rounded-t-lg">
        <Link
          to={`/product/${item?.slug}`}
          className={`block aspect-square bg-white ${horizontal ? "py-10" : "p-2"} `}
        >
          <img
            className={`h-full w-[25vw] hover:scale-110 transition-all ease-in-out duration-500 object-contain bg-white aspect-square text-center text-[10px]`}
            src={item?.thumbnail?.url}
            alt={item?.title}
            loading="lazy"
          />
        </Link>
      </div>
      <div
        className={`details p-2 w-full flex flex-col ${
          horizontal ? "gap-2" : "gap-1"
        }`}
      >
        <Link to={`/product/${item?.slug}`}>
          <p
            className={`text-gray-500 capitalize ${
              horizontal ? "text-[16px]" : "text-[13px]"
            } font-[600]`}
          >
            {item?.brand?.name}
          </p>
          <p
            className={`text-black font-[400] capitalize ${
              horizontal ? "text-[15px]" : "text-[12px]"
            } line-clamp-2`}
          >
            {item?.title}
          </p>
          <div className="flex items-center gap-x-1 w-full pr-2 rounded-lg">
            {GetRating(item?.rating || 4.4)}
            <p className={`${smText} text-gray-400`}>
              ({item?.reviewsLength || 0})
            </p>
          </div>
          <Price mrp={item?.mrp} sellingPrice={item?.price} textSize={smText} />
        </Link>
        <Button
          className={`!mt-2 ${
            horizontal ? "w-1/5" : "w-full"
          } p-3 addToCart-btn !border-[1px] !border-primary !text-primary hover:!bg-black hover:!text-white  hover:!border-black gap-x-2`}
        >
          <IoCartOutline className={`${lgText}`} />
          Add to Cart
        </Button>
      </div>

      {/* child buttons */}
      <div className="discount-icons absolute top-2 -left-4 !text-[12px] transition-all duration-300 ease-in-out ">
        <Badge
          value={parseInt(((item?.mrp - item?.price) / item?.mrp) * 100) + "%"}
          size={1}
          color="bg-primary"
        />
      </div>
      <div className="right-icons absolute -top-40 right-3 !text-[12px] space-y-2 transition-all duration-300 ease-in-out opacity-[0.9] flex flex-col ">
        <button className="cursor-pointer group" onClick={handleOpenModal}>
          <GiExpand className="icon-hover border-[1px] rounded-full p-[5px] text-center text-3xl bg-white border-gray-200 hover:bg-primary hover:text-white group-active:!bg-black" />
        </button>
        <button className="cursor-pointer group">
          <IoGitCompareOutline className="icon-hover border-[1px] rounded-full p-[4px] text-center text-3xl bg-white border-gray-200 hover:bg-primary hover:text-white group-active:!bg-black" />
        </button>
        <button className="cursor-pointer group">
          <IoHeartOutline className="icon-hover border-[1px] rounded-full p-[4px] text-center text-3xl bg-white border-gray-200 hover:bg-primary hover:text-white group-active:!bg-black " />
        </button>
      </div>
      <ProductModal isModalOpen={isModalOpen} setModalOpen={setModalOpen}>
        <div className="w-1/4 h-full">
          <Gallery
            imagesData={imagesData}
            getActive={(i) => setActiveThumb(imagesData[i])}
          />
        </div>
        <img src={activeThum} className="w-100 h-100" alt="" />
        <div className="flex flex-col gap-2 m-2 z-20">
          <div className="brand font-[600] text-3xl text-gray-700">
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
              <span className=" font-[500] text-md">Available in Stock: </span>
              <span className="text-green-600 font-[600]">147 Items </span>
            </p>
            <div className="size flex flex-col gap-2">
              <div>
                <span className=" font-[500] text-md">Size: </span>
                <span className="text-gray-700 font-[600]"> Small </span>
              </div>
              <SizeVariantList
                // getActive={getActiveIndex}
                items={["Small", "Medium", "Large", "XL", "XXL"]}
              />
            </div>
            <div className="color-variants flex   gap-2 flex-col">
              <span className=" font-[500] text-md">Color: </span>
              <div className="flex gap-2">
                <div className="box h-10 w-10 bg-amber-500 rounded-full "></div>
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
              <QuantityBox />
              <Button className="!bg-primary !text-white w-1/4 flex items-center gap-2">
                <MdShoppingCart className="text-xl" />
                <p> Add To Cart</p>
              </Button>
            </div>
          </div>
        </div>
      </ProductModal>
    </div>
  );
};

export default memo(ProductItem);
// memo to save from rerendering when related items navigate to product item page then related items don't rerender
