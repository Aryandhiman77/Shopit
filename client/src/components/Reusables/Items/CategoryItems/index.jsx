import React from "react";
import { Link } from "react-router-dom";
import { SwiperSlide } from "swiper/react";

const CategoryItem = ({ item }) => {
  return (
    <>
      <Link
        to={`/category/${item?.slug}`}
        className="flex flex-col justify-center items-center p-3 gap-y-2 rounded-md bg-white cursor-pointer border-[1px] border-gray-300 shadow-sm"
      >
        <img
          className="h-40 w-40 object-contain hover:scale-105 transition-all ease-in-out duration-250"
          src={item?.image?.url}
          alt={item?.name}
        />
        <p className="text-[0.9rem] w-full text-center">{item?.name}</p>
      </Link>
    </>
  );
};

export default CategoryItem;
