import Divider from "@mui/material/Divider";
import React, { useContext } from "react";
import CartItem from "../../components/Reusables/Items/CartPanelItem";
import { IoCloseOutline } from "react-icons/io5";
import DataContext from "../../context/DataContext";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { BsCartCheck, BsCartCheckFill } from "react-icons/bs";

const CartPage = () => {
  const { cartItems } = useContext(DataContext);
  return (
    <div className="container max-w-screen-xl m-auto mt-4 flex flex-row gap-5">
      <div className="my-cart w-[65%] bg-white  rounded-lg shadow-lg border-[1px] border-gray-200">
        <div className="header p-5">
          <p className="text-gray-600 font-[600] text-[16px]">My Cart</p>
          <p className="text-gray-600 font-[400] text-sm">
            There are 6 products in your cart
          </p>
        </div>
        <Divider />
        <div className="cart-body">
          {cartItems?.map((item, i) => (
            <div className=" z-20 hover:bg-[#f2d9ce] rounded-sm">
              <CartItem item={item} deleteIcon={<IoCloseOutline />} key={i} />
              <Divider className="!p-0" />
            </div>
          ))}
        </div>
      </div>
      <div className="price-info-card w-[35%] bg-white sticky top-13 h-fit rounded-lg overflow-hidden shadow-lg border-[1px] border-gray-200">
        <div className="total bg-white flex-shrink-0">
          <div className="header p-5">
            <p className="text-gray-600 font-[600] text-[16px]">Cart Total</p>
          </div>
          <Divider />
          <div className="flex justify-between p-2 text-sm">
            <span className="font-[600]">Subtotal</span>
            <span className="text-primary font-[600]">₹ 18,999 </span>
          </div>
          <div className="flex justify-between p-2">
            <span className="font-[600]">Shipping</span>
            <span className="text-black font-[600]">free </span>
          </div>
          <div className="flex justify-between p-2">
            <span className="font-[600]">Estimate price</span>
            <span className="text-primary font-[600] line-through">₹ 22,999 </span>
          </div>
          <div className="flex justify-between p-4">
            <span className="font-[600]">Discount </span>
            <span className="text-primary font-[600]">₹ 30% off </span>
          </div>
          <Divider />
          <div className="flex justify-between p-4">
            <span className="font-[600]">Total (all taxes incl.)</span>
            <span className="text-primary font-[600]">₹ 15,999 </span>
          </div>
          <Divider />
          <div className="btns flex flex-row justify-between p-4 gap-2">
          <Link to={"/myCart"} >
            <Button className="!text-white !bg-primary !py-3 w-100 hover:!bg-black flex items-center">
                <BsCartCheckFill className="text-2xl mx-2 font-bold"/>
                Checkout
            </Button>
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
