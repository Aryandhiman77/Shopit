import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import React from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import CartItem from "../../../Reusables/Items/CartItem";

const CartPanel = ({ setDrawerOpen }) => {
    const items = [
        {
            brand:"Apple",
            name:"iPhone 15 pro",
            price:15000,
        }
    ]
  return (
    <div className="h-full bg-[#e5e5e5]">
      <div className="cart-header flex w-[400px] justify-between p-3 bg-white">
        <div className="flex items-center gap-3">
          <div className="heading text-gray-600 font-[500]">Shopping Bag </div>
          <span className="text-[13px]">( {items?.length} ) items</span>
        </div>
        <div className="btn-close">
          <Button
            onClick={() => setDrawerOpen(false)}
            className="!text-black !rounded-full"
          >
            <MdClose className="text-2xl" />
          </Button>
        </div>
      </div>
      <Divider />
      <div className="cart-body ">
        {true ? (
          items?.map((item) => (
              <CartItem item={item} />
          ))
        ) : (
          <div className="empty-cart flex justify-center items-center flex-col h-full ">
            <img
              className="w-60 h-auto object-contain"
              src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
              alt=""
            />
            <div className="text-center mt-4">
              <p className="text-gray-600 font-[600]">
                Your cart is currently empty.
              </p>
              <Button className="!bg-primary !text-white !mt-4">
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPanel;
