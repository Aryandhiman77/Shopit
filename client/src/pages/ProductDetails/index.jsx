import { useContext, useEffect, useRef, useState } from "react";
import ImageZoom from "../../components/Reusables/ImageZoom";
import { useParams } from "react-router-dom";
import ItemSlider from "../../components/Reusables/Sliders/ItemSlider";
import BreadCrumb from "../../components/Reusables/BreadCrumb";
import "./style.css";
import Rating from "@mui/material/Rating";
import Price from "../../components/Reusables/Items/ProductItem/Price";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { MdShoppingCart } from "react-icons/md";
import ProductItem from "../../components/Reusables/Items/ProductItem";
import DataContext from "../../context/category/CategoryContext";
import QuantityBox from "../../components/Reusables/QuantityBox";
import AdditionalProductInformation from "./AdditionalProductInfo";
import SizeVariantList from "../../components/Reusables/SizeVariantList";
import Gallery from "./Gallery";
import useProduct from "../../hooks/useProduct";

const ProductDetails = () => {
  const { slug } = useParams(); // GET SLUG AND WAIT FOR API CALL
  const { product, isLoading, getProduct, resetProduct } = useProduct();

  const galleryImages = [...(product?.gallery?.map((g) => g?.url) || [])];
  const [activeThumbnail, setActiveThumbnail] = useState(
    product?.thumbnail?.url,
  );
  const getActiveIndex = (i) => {
    console.log(i);
  };

  const handleImageZoomPropChange = (i) => {
    setActiveThumbnail(galleryImages[i]);
  };
  useEffect(() => {
    getProduct(slug);
    return () => {
      resetProduct();
    };
  }, []);
  return (
    <div>
      <div className="flex justify-between w-full bg-[#e5e5e5]">
        <BreadCrumb staticValues={"product"} />
        {isLoading("product-details") && <h1>Loading...</h1>}
        <label
          htmlFor="compare"
          className="flex items-center gap-3 pr-5 text-sm"
        >
          Compare
          <input type="checkbox" id="compare" />
        </label>
      </div>
      <div className="flex flex-row gap-4 p-2">
        <Gallery
          imagesData={galleryImages}
          getActive={handleImageZoomPropChange}
        />
        <ImageZoom image={activeThumbnail || product?.thumbnail?.url}>
          <div className="flex flex-col gap-2 m-2 relative z-20">
            <div className="heading font-[600] text-3xl text-gray-700 capitalize">
              {product?.title}
            </div>
            <div className="flex gap-1 items-center">
              <div className="brand  text-lg ">
                <span className="text-gray-500 font-[400]">Brand: </span>
                <span className="font-[500]"> {product?.brand?.name} </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <Price
                mrp={product?.mrp}
                sellingPrice={product?.price}
                textSize={"text-[20px]"}
              />
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
              {product?.shortDescription}
            </div>
            <Divider />
            <div className="keyValueDetails flex flex-col gap-3">
              <p className="stock">
                <span className=" font-[500] text-md">
                  Available in Stock:{" "}
                </span>
                <span className="text-green-600 font-[600]">
                  {product?.stock} Items{" "}
                </span>
              </p>
              {/* <div className="size flex flex-col gap-2">
                <div>
                  <span className=" font-[500] text-md">Size: </span>
                  <span className="text-gray-700 font-[600]"> Small </span>
                </div>
                <SizeVariantList
                  getActive={getActiveIndex}
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
              </div> */}
              {/* {product?.attributes?.length &&
                Object.entries(product?.attributes)?.map([key, value], i)=>(<></>)} */}
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
        </ImageZoom>
      </div>
      <div className="additional-details w-full p-3 bg-white">
        <AdditionalProductInformation richDescription={product?.description} />
      </div>
      <div className="product-section mt-4 bg-white p-5">
        <div className="header-section flex justify-between ">
          <p className="text-xl font-[600] px-5 text-gray-600">
            Related Products
          </p>
          <Button className="!text-primary">View all</Button>
        </div>
        {/* <div className="product-list mt-2">
          <ItemSlider
            slidesPerView={6}
            slidesPerGroup={4}
            spaceBetween={10}
            items={productsData}
            breakpoints={true}
            renderItem={(item) => <ProductItem item={item} />}
          />
        </div> */}
      </div>
    </div>
  );
};

export default ProductDetails;
