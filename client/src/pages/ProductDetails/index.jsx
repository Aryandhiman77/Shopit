import React from "react";
import ImageZoom from "../../components/Reusables/ImageZoom";
import { useParams } from "react-router-dom";
import ItemSlider from "../../components/Reusables/Sliders/ItemSlider";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Rating from "@mui/material/Rating";
import Price from "../../components/Reusables/Items/ProductItem/Price";
import Divider from "@mui/material/Divider";

const ProductDetails = () => {
  const { slug } = useParams();
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
                className="h-23  object-cover border-[1px] border-black rounded-xl m-1"
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
            <div className="flex flex-col gap-2 m-2 relative">
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
          <div className="description text-gray-500 font-[400] my-4">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus
            perspiciatis distinctio exercitationem nisi. Autem natus error
            exercitationem architecto vitae sunt cumque qui at reprehenderit.
            Tenetur debitis aut perferendis provident esse dolorum saepe hic
            iusto, quos vel cum laudantium optio, assumenda nihil. Natus,
            inventore sit nulla enim minima praesentium quo, quod saepe ex
            pariatur est velit odit maiores eveniet distinctio tempore
            asperiores nihil officia mollitia numquam nesciunt ab reprehenderit?
            Ipsam hic assumenda unde? Perspiciatis nemo excepturi beatae,
            reiciendis quia dolore qui veniam recusandae dignissimos fugit hic
            dolorem porro quos molestias, maxime praesentium architecto!
            Laboriosam, facilis, atque excepturi quam quos tempora quidem,
            quaerat qui ad nihil repellendus! Error doloremque asperiores vel
            culpa voluptate iure itaque exercitationem, velit quaerat laborum
            distinctio qui sit adipisci in debitis, possimus odio quibusdam modi
            molestias delectus autem aliquam? Sapiente harum animi eaque beatae
            maxime sequi aspernatur?
          </div>
          <div className="description text-gray-500 font-[400] my-4">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus
            perspiciatis distinctio exercitationem nisi. Autem natus error
            exercitationem architecto vitae sunt cumque qui at reprehenderit.
            Tenetur debitis aut perferendis provident esse dolorum saepe hic
            iusto, quos vel cum laudantium optio, assumenda nihil. Natus,
            inventore sit nulla enim minima praesentium quo, quod saepe ex
            pariatur est velit odit maiores eveniet distinctio tempore
            asperiores nihil officia mollitia numquam nesciunt ab reprehenderit?
            Ipsam hic assumenda unde? Perspiciatis nemo excepturi beatae,
            reiciendis quia dolore qui veniam recusandae dignissimos fugit hic
            dolorem porro quos molestias, maxime praesentium architecto!
            Laboriosam, facilis, atque excepturi quam quos tempora quidem,
            quaerat qui ad nihil repellendus! Error doloremque asperiores vel
            culpa voluptate iure itaque exercitationem, velit quaerat laborum
            distinctio qui sit adipisci in debitis, possimus odio quibusdam modi
            molestias delectus autem aliquam? Sapiente harum animi eaque beatae
            maxime sequi aspernatur?
          </div>
          <Divider />
          <div className="keyValueDetails flex flex-col gap-10">
            <p className="stock">
              <span className=" font-[500] text-md">Available in Stock: </span>
              <span className="text-green-600 font-[600]">147 Items </span>
            </p>
            <p className="size">
              <span className=" font-[500] text-md">Size: </span>
              <span className="text-green-600 font-[600]">147 Items </span>
            </p>
          </div>
        </div>
        </ImageZoom>
        
      </div>
    </div>
  );
};

export default ProductDetails;
