import React from "react";
import { CheckCircle, Truck, Package, Home, Clock } from "lucide-react";
import { motion } from "framer-motion";

const TrackPackage = () => {
  const orderStatus = [
    { label: "Order Placed", date: "Aug 30, 2025", icon: <Package />, completed: true },
    { label: "Packed", date: "Aug 31, 2025", icon: <CheckCircle />, completed: true },
    { label: "Shipped", date: "Sep 1, 2025", icon: <Truck />, completed: true },
    { label: "Out for Delivery", date: "Sep 2, 2025", icon: <Clock />, completed: false },
    { label: "Delivered", date: "Expected Sep 2, 2025", icon: <Home />, completed: false },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.h1
        className="text-2xl font-semibold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Track Package
      </motion.h1>

      {/* Order Info */}
      <motion.div
        className="bg-white shadow-md rounded-lg p-6 mb-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Order #123456789</h2>
            <p className="text-gray-500">Placed on Aug 30, 2025</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Expected Delivery</p>
            <p className="text-lg font-semibold text-green-600">Sep 2, 2025</p>
          </div>
        </div>
      </motion.div>

      {/* Shipment Progress */}
      <motion.div
        className="bg-white shadow-md rounded-lg p-6 mb-8"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 className="text-lg font-semibold mb-4">Shipment Progress</h3>
        <div className="relative border-l-2 border-gray-300 pl-6">
          {orderStatus.map((step, i) => (
            <motion.div
              key={i}
              className="mb-6 last:mb-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <div
                className={`absolute -left-[10px] rounded-full w-5 h-5 flex items-center justify-center ${
                  step.completed ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                {React.cloneElement(step.icon, {
                  size: 12,
                  className: "text-white",
                })}
              </div>
              <p className="font-medium">{step.label}</p>
              <p className="text-sm text-gray-500">{step.date}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Courier Details */}
      <motion.div
        className="bg-white shadow-md rounded-lg p-6 mb-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h3 className="text-lg font-semibold mb-4">Courier Details</h3>
        <p className="text-gray-600">Courier: BlueDart</p>
        <p className="text-gray-600">Tracking ID: BD123456789</p>
        <button className="mt-3 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
          Track on Courier Website
        </button>
      </motion.div>

      {/* Order Summary */}
      <motion.div
        className="bg-white shadow-md rounded-lg p-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
        <div className="flex items-center gap-4 mb-4 p-4 rounded-lg border-[1px] border-gray-300 hover:shadow-md transition">
          <img
            src="https://via.placeholder.com/100"
            alt="Product"
            className="w-24 h-24 rounded-lg border object-cover"
          />
          <div className="flex-1">
            <p className="font-medium text-lg">Wireless Bluetooth Headphones</p>
            <p className="text-gray-500 text-sm">Color: Black</p>
            <p className="text-gray-500 text-sm">Qty: 1</p>
          </div>
          <p className="font-semibold text-lg">₹2,999</p>
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Subtotal</span>
            <span>₹2,999</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Shipping</span>
            <span>₹50</span>
          </div>
          <div className="flex justify-between text-sm font-semibold">
            <span>Total</span>
            <span className="text-green-600">₹3,049</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TrackPackage;
