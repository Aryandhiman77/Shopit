import Divider from '@mui/material/Divider';
import Rating from '@mui/material/Rating';
import React from 'react'
import { IoClose } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const WishlistItem = () => {
  return (
    <>
    <Link className="wishlist-item p-2 flex flex-row gap-10 relative hover:bg-[#e5e5e5]">
          <img
            src="https://serviceapi.spicezgold.com/download/1742462909156_gdgd1.jpg"
            alt=""
            className="h-40 w-35 object-cover rounded-lg"
          />
          <div className="flex flex-col gap-1 justify-center group  ">
            <p className="brand text-[14px] font-[400]">Apple</p>
            <p className="name text-[16px] font-[500] group-hover:text-primary">iPhone 15 pro max</p>
            <div className="flex flex-col gap-5">
              <Rating size="small" value={5} readOnly />
              <div>
                <span className="line-through text-md">₹ 5,999</span>
                <span className="text-primary font-[600] px-10 text-lg">₹ 5,999</span>
                <span className="text-primary font-[400] px-2 text-md">14% off</span>
              </div>
            </div>
          </div>
          <button className="cursor-pointer">
          <IoClose className="text-2xl absolute right-5 top-2 hover:text-primary"/>
          </button>
        </Link>
        <Divider/>
        </>
  )
}

export default WishlistItem
