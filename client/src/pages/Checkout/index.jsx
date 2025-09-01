import React, { useState } from "react";
import { Link } from "react-router-dom";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");

  const cartItems = [
    {
      id: 1,
      name: "Nike Air Zoom Pegasus",
      size: "42",
      quantity: 1,
      price: 8999,
      image: "https://rukminim2.flixcart.com/image/704/844/xif0q/shoe/d/f/d/-original-imah49fsejv4xrbm.jpeg?q=90&crop=false",
    },
    {
      id: 2,
      name: "Adidas Ultraboost 21",
      size: "41",
      quantity: 2,
      price: 12999,
      image: "https://images-cdn.ubuy.co.in/65fed6212d90ee163700a4f9-adidas-men-39-s-ultraboost-21-running.jpg",
    },
  ];

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 199;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Side - Shipping + Payment */}
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Address */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="border border-gray-300 p-3 rounded-lg focus:outline-primary"
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="border border-gray-300 p-3 rounded-lg focus:outline-primary"
              />
              <input
                type="text"
                placeholder="Email Address"
                className="border border-gray-300 p-3 rounded-lg focus:outline-primary md:col-span-2"
              />
              <input
                type="text"
                placeholder="Street Address"
                className="border border-gray-300 p-3 rounded-lg focus:outline-primary md:col-span-2"
              />
              <input
                type="text"
                placeholder="City"
                className="border border-gray-300 p-3 rounded-lg focus:outline-primary"
              />
              <input
                type="text"
                placeholder="State"
                className="border border-gray-300 p-3 rounded-lg focus:outline-primary"
              />
              <input
                type="text"
                placeholder="Postal Code"
                className="border border-gray-300 p-3 rounded-lg focus:outline-primary"
              />
              <input
                type="text"
                placeholder="Country"
                className="border border-gray-300 p-3 rounded-lg focus:outline-primary"
              />
            </form>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <div className="space-y-3">

              <label className="flex items-center gap-3 cursor-pointer border border-gray-200 p-3 rounded-lg hover:border-primary transition">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "razorpay"}
                  onChange={() => setPaymentMethod("razorpay")}
                  className="w-4 h-4 accent-primary"
                />
                <span>Razorpay (Google Pay, PhonePe, Paytm, UPI)</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer border border-gray-200 p-3 rounded-lg hover:border-primary transition">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="w-4 h-4 accent-primary"
                />
                <span>Cash on Delivery</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Side - Order Summary */}
        <div className="bg-white p-6 rounded-2xl shadow-md h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="border-t border-gray-200 my-4"></div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹{shipping}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (5%)</span>
              <span>₹{tax.toFixed(0)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹{total.toFixed(0)}</span>
            </div>
          </div>

          {/* Place Order Button */}
          <Link to={"/orderPlaced"}>
          <button  className="mt-6 w-full bg-primary text-white py-3 rounded-xl text-lg font-semibold hover:bg-primary/90 transition cursor-pointer">
            Place Order
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
