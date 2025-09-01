import React from "react";
import { CheckCircle, Truck, Package, Home, Clock } from "lucide-react";

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
      <h1 className="text-2xl font-semibold mb-6">Track Package</h1>

      {/* Order Info */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
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
      </div>

      {/* Shipment Progress */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Shipment Progress</h3>
        <div className="relative border-l-2 border-gray-300 pl-6">
          {orderStatus.map((step, i) => (
            <div key={i} className="mb-6 last:mb-0">
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
            </div>
          ))}
        </div>
      </div>

      {/* Courier Details */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Courier Details</h3>
        <p className="text-gray-600">Courier: BlueDart</p>
        <p className="text-gray-600">Tracking ID: BD123456789</p>
        <button className="mt-3 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
          Track on Courier Website
        </button>
      </div>

      {/* Order Summary */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
        <div className="flex items-center gap-4 mb-4">
          <img
            src="https://via.placeholder.com/80"
            alt="Product"
            className="w-20 h-20 rounded-lg border"
          />
          <div>
            <p className="font-medium">Wireless Bluetooth Headphones</p>
            <p className="text-gray-500 text-sm">Qty: 1</p>
            <p className="text-gray-500 text-sm">₹2,999</p>
          </div>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>₹2,999</span>
        </div>
      </div>
    </div>
  );
};

export default TrackPackage;
