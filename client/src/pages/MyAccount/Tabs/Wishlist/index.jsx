import Divider from "@mui/material/Divider";
import Rating from "@mui/material/Rating";
import React from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import WishlistItem from "../../../../components/Reusables/Items/WishlistItem";

const Wishlist = () => {
  return (
    <div>
      <div className="header p-5">
        <p className="text-gray-600 font-[600] text-[16px]">My Wishlist</p>
      </div>
      <Divider />
      <div className="wishlist-items ">
        <WishlistItem/>
        <WishlistItem/>
        <WishlistItem/>
        <WishlistItem/>
      </div>
    </div>
  );
};

export default Wishlist;
