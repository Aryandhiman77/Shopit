import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import React, { useContext } from "react";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import CartPanelItem from "../../../Reusables/Items/CartPanelItem";
import DataContext from "../../../../context/data/DataContext";

const CartPanel = ({ setDrawerOpen }) => {
  const { cartItems } = useContext(DataContext);

  return (
    <div className="bg-[#e5e5e5] flex flex-col h-full w-[400px]">
      {/* Header */}
      <div className="cart-header flex justify-between p-3 bg-white flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="heading text-gray-600 font-[500]">Shopping Bag</div>
          <span className="text-[13px]">( {cartItems?.length} ) items</span>
        </div>
        <Button
          onClick={() => setDrawerOpen(false)}
          className="!text-black !rounded-full"
        >
          <MdClose className="text-2xl" />
        </Button>
      </div>
      <Divider />

      {/* Body */}
      <div className="cart-body flex-1 overflow-y-auto">
        {cartItems.length > 0 ? (
          cartItems.map((item, i) => (
            <div className=" z-20 bg-white hover:bg-[#f2d9ce]">
              <CartPanelItem key={i} item={item} />
            </div>
          ))
        ) : (
          <div className="empty-cart flex justify-center items-center flex-col h-full">
            <img
              className="w-60 h-auto object-contain"
              src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
              alt="Empty Cart"
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

      {/* Footer */}
      <div className="total bg-white flex-shrink-0">
        <Divider />
        <div className="flex justify-between p-4 text-sm">
          <span className="font-[600]">{cartItems?.length} items</span>
          <span className="text-primary font-[600]">₹ 3,999 </span>
        </div>
        <Divider />
        <div className="flex justify-between p-4">
          <span className="font-[600]">Total (tax excl.)</span>
          <span className="text-primary font-[600]">₹ 3,999 </span>
        </div>
        <Divider />
        <div className="btns flex flex-row justify-between p-4 gap-2">
          <Link to={"/myCart"} onClick={() => setDrawerOpen(false)}>
            <Button className="!text-white !bg-primary !px-12 !py-3 hover:!bg-black">
              View Cart
            </Button>
          </Link>
          <Link to={"/checkout"} onClick={() => setDrawerOpen(false)}>
            <Button className="!border-[1px] !border-primary !text-primary !px-4 !py-3 hover:!bg-black hover:!text-white hover:!border-black">
              Proceed to Buy
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPanel;
