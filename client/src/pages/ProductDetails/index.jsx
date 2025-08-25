import React, { useContext } from "react";
import ImageZoom from "../../components/Reusables/ImageZoom";
import { useParams } from "react-router-dom";
import ItemSlider from "../../components/Reusables/Sliders/ItemSlider";
import { Swiper, SwiperSlide } from "swiper/react";
import BreadCrumb from "../../components/Reusables/BreadCrumb";

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

const ProductDetails = () => {
  const { slug } = useParams();
  const { productsData } = useContext(DataContext);
  console.log(slug);
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
            direction={"vertical"}
            slidesPerView={4}
            slidesPerGroup={1}
            spaceBetween={0}
            items={imagesData}
            breakpoints={false}
            renderItem={(src, i) => (
              <img
                key={i}
                className="h-20 w-auto object-cover border-[1px] border-black rounded-xl m-1"
                src={src}
                alt=""
              />
            )}
          />
        </div>
        <ImageZoom
          image={
            "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXBwbGUlMjBpcGhvbmV8ZW58MHx8MHx8fDA%3D"
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
            <div className="description text-gray-500 font-[400] my-4 line-clamp-3">
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
              <div className="size flex flex-row items-center gap-3">
                <span className=" font-[500] text-md">Size: </span>
                <div className="font-[400] border-[1px] border-gray-300 p-2 text-white bg-primary rounded-md">
                  SM
                </div>
                <div className="font-[400] border-[1px] border-gray-300 p-2 hover:bg-[#e5e5e5] cursor-pointer rounded-md">
                  MD
                </div>
                <div className="font-[400] border-[1px] border-gray-300 p-2 hover:bg-[#e5e5e5] cursor-pointer rounded-md">
                  LG
                </div>
                <div className="font-[400] border-[1px] border-gray-300 p-2 hover:bg-[#e5e5e5] cursor-pointer rounded-md">
                  XL
                </div>
                <div className="font-[400] border-[1px] border-gray-300 p-2 hover:bg-[#e5e5e5] cursor-pointer rounded-md">
                  XXL
                </div>
              </div>
              <div className="color-variants flex gap-2 items-center">
                <span className=" font-[500] text-md">Color: </span>
                <div className="box h-10 w-10 bg-amber-500 rounded-full"></div>
                <div className="box h-10 w-10 bg-red-500 rounded-full"></div>
                <div className="box h-10 w-10 bg-pink-500 rounded-full"></div>
              </div>
              <p className="shipping-info">
                <span className=" font-[500] text-sm text-gray-600">
                  Free Shipping (Est. Delivery time 2-3 Days)
                </span>
              </p>
              <div className="addtoCart flex gap-4">
                <input
                  type="number"
                  defaultValue={0}
                  min={0}
                  max={100}
                  className="border-[1px] border-[#e5e5e5] focus:outline-none w-20 p-2"
                />
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
        <ScrollTab
          items={[
            { name: "Description" },
            { name: "Product Details" },
            { name: "Reviews" },
          ]}
        />
        <Divider />
        <p className="text-gray-500 font-[300] text-[15px] p-2">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod
          accusantium quos natus quia dignissimos itaque magnam ipsam
          perferendis odit? Voluptates perspiciatis totam expedita. Optio
          aliquam aut perferendis quos impedit dolore exercitationem, earum
          maiores iste blanditiis rerum? Eligendi dicta eveniet placeat quidem
          voluptate porro sit ex repellendus, sunt aperiam harum odit reiciendis
          tenetur? Ut eos tempora eveniet neque tempore nulla odio officiis
          quibusdam, quisquam, reiciendis velit repellendus perferendis harum,
          mollitia beatae eaque dignissimos facere hic omnis laudantium
          accusantium voluptatem officia. Itaque minus corrupti nam ullam
          repudiandae quos reiciendis suscipit libero incidunt totam facere
          maiores beatae, quam, distinctio maxime odit error! Fuga corporis
          doloremque voluptatem explicabo fugit cum possimus magnam corrupti
          assumenda dolores magni velit, quas fugiat quidem? Iste fuga officiis
          commodi obcaecati ipsum, quasi reiciendis quo sapiente. Sequi impedit
          architecto libero? Provident accusantium expedita, iure deserunt et
          asperiores quibusdam exercitationem aut odio, in cum possimus optio
          necessitatibus beatae recusandae, nesciunt aliquam. Necessitatibus
          cumque laudantium corporis expedita amet, veniam nesciunt excepturi.
          Sapiente distinctio doloribus nulla aut veniam, non molestiae fuga,
          iusto voluptas eius natus pariatur quibusdam laborum? Dolores
          accusantium quasi excepturi vitae autem fugit, molestiae, sunt
          mollitia, id exercitationem rerum a numquam unde? Repudiandae dolores
          itaque architecto quibusdam ab ratione deserunt, sapiente ex sit sunt
          molestias eligendi quasi mollitia optio perspiciatis. Assumenda
          voluptates delectus recusandae dolores nemo totam reprehenderit quae
          fuga? Aspernatur consectetur quam cum cupiditate in molestiae dolorem.
          Dolor ipsa similique deserunt accusamus accusantium!
        </p>
      </div>
      <div className="product-section mt-4 bg-white p-5">
        <div className="header-section flex justify-between ">
          <p className="text-xl font-[600] px-5 text-gray-600">
            Related Products
          </p>
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
