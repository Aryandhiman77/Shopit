import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const OrderPlaced = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Stop confetti after 5 seconds
    const timer = setTimeout(() => setShowConfetti(false), 5000);

    // Update window size dynamically
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-white text-center p-6">
      {showConfetti && (
        <Confetti width={windowSize.width} height={windowSize.height} />
      )}

      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-6"
      >
        <CheckCircle className="text-green-500 w-24 h-24" />
      </motion.div>

      {/* Order Placed Message */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl font-bold text-gray-800"
      >
        🎉 Order Placed Successfully!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-gray-600 mt-3 max-w-lg"
      >
        Thank you for shopping with us. Your order has been confirmed and is
        being processed. You’ll receive a confirmation email with your order
        details shortly.
      </motion.p>

      {/* Order Summary Card */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="bg-white shadow-xl rounded-2xl mt-8 w-full max-w-md p-6 text-left"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Order Summary
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Order ID:</span>
            <span className="font-medium">#12345</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Payment:</span>
            <span className="font-medium">Razorpay</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Estimated Delivery:</span>
            <span className="font-medium">Sep 10, 2025</span>
          </div>
        </div>
      </motion.div>

      {/* CTA Button */}
      <div className="flex gap-10">
        <Link to={"/track"}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 bg-green-500 text-white px-6 py-3 rounded-xl shadow-md font-medium hover:bg-green-600 transition"
          >
            Track Your Order
          </motion.button>
        </Link>
        <Link to={"/"}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 bg-primary text-white px-6 py-3 rounded-xl shadow-md font-medium hover:bg-red-500 transition"
          >
            Continue Shopping
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default OrderPlaced;
