import React from 'react'
import { Link } from 'react-router-dom'
import { SwiperSlide } from 'swiper/react'

const CategoryItem = ({item}) => {
  return (
    <>
        <Link to={"/"} className="flex flex-col justify-center items-center p-3 gap-y-2 rounded-md bg-white cursor-pointer border-[1px] border-gray-300 shadow-[0_3px_12px_0.1px_rgba(8,8,8,0.4)]">
              <img
                className="h-[150px] w-[150px] object-contain hover:scale-105 transition-all ease-in-out duration-250"
                src={item?.image}
                alt="Category image"
              />
              <p className="text-[0.9rem] w-full text-center">{item.name}</p>
            </Link>
    </>
  )
}

export default CategoryItem
