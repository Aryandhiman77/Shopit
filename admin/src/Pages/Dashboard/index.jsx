import React, { useContext } from "react";
import Box from "../../Components/Reusables/Elements/Box";
import { BsGraphDownArrow, BsGraphUpArrow, BsPlus } from "react-icons/bs";
import image from "../../assets/dashboard-main.webp";
import {
  PiBankDuotone,
  PiChartPieSliceDuotone,
  PiExportDuotone,
  PiGiftDuotone,
  PiPlus,
} from "react-icons/pi";
import { IoStatsChart } from "react-icons/io5";
import Search from "../../Components/Reusables/Search";
import { Divider } from "@mui/joy";

import LinesChart from "../../Components/Reusables/Charts/LinesChart";
import { GoDotFill } from "react-icons/go";
import ProductList from "./ProductList";
import OrderList from "./OrderList";
import useData from "../../Components/hooks/useCategory";

const Dashboard = () => {
  const { lineChartData } = useData();

  return (
    <div className="p-4 my-1 flex flex-col gap-y-5 w-full">
      <Box className={"flex justify-between items-center bg-white darkmode"}>
        <div>
          <div>
            <p className="text-3xl font-[700]">Good Morning,</p>
            <p className="text-3xl font-[700]">Aryan</p>
          </div>
          <p className="pt-4 text-gray-600 font-[350]">
            Here’s What happening on your store today. See the statistics at
            once.
          </p>
          <button className="custom-btn custom-border !bg-blue-500 flex flex-row items-center text-white !mt-10 hover:!bg-blue-800 hover:!text-white !p-3">
            <BsPlus className="text-xl" />
            <p className="text-sm">Add Product</p>
          </button>
        </div>
        <img
          src={image}
          alt=""
          className="h-50 w-auto object-cover scale-160 -translate-x-10"
        />
      </Box>
      <div className="data-highlights flex gap-4 w-full">
        <Box className={" w-1/3 bg-white darkmode"}>
          <button className="flex justify-between gap-8 items-center w-full">
            <div className="flex items-center gap-4">
              <PiGiftDuotone className="text-5xl text-blue-500" />
              <div className="text-start">
                <p className="text-sm text-gray-600">New Orders</p>
                <p className="text-2xl font-[600]">1,390</p>
              </div>
            </div>
            <IoStatsChart className="text-6xl text-blue-700" />
          </button>
          <div className="h-[1px] border-t-[1px] border-dashed my-3 border-[#c3c2c2]"></div>
          <p className="text-gray-600 text-sm flex items-center gap-2">
            <span className="text-green-600 flex items-center gap-2">
              <BsGraphUpArrow className="text-lg" /> 54.3%{" "}
            </span>
            Increased last month
          </p>
        </Box>
        <Box className={" w-1/3 bg-white darkmode"}>
          <button className="flex justify-between gap-8 items-center w-full">
            <div className="flex items-center gap-4">
              <PiChartPieSliceDuotone className="text-5xl text-green-500" />
              <div className="text-start">
                <p className="text-sm text-gray-600">Sales</p>
                <p className="text-2xl font-[600]">₹13,999</p>
              </div>
            </div>
            <IoStatsChart className="text-6xl text-green-500" />
          </button>
          <div className="h-[1px] border-t-[1px] border-dashed my-3 border-[#c3c2c2]"></div>
          <p className="text-gray-600 text-sm flex items-center gap-2">
            <span className="text-red-600 flex items-center gap-2">
              <BsGraphDownArrow className="text-lg " /> 54.3%{" "}
            </span>
            Increased last month
          </p>
        </Box>
        <Box className={" w-1/3 bg-white darkmode"}>
          <button className="flex justify-between gap-8 items-center w-full">
            <div className="flex items-center gap-4">
              <PiBankDuotone className="text-5xl text-purple-700" />
              <div className="text-start">
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="text-2xl font-[600]">1,390</p>
              </div>
            </div>
            <IoStatsChart className="text-6xl text-purple-700" />
          </button>
          <div className="h-[1px] border-t-[1px] border-dashed my-3 border-[#c3c2c2]"></div>
          <p className="text-gray-600 text-sm flex items-center gap-2">
            <span className="text-green-600 flex items-center gap-2">
              <BsGraphUpArrow className="text-lg" /> 54.3%{" "}
            </span>
            Increased last month
          </p>
        </Box>
      </div>
      <Box className={"bg-white"}>
        <div className="flex justify-between items-center">
          <p className="heading-1">Product List</p>
          <div className="flex flex-row items-center gap-3">
            <button className="custom-btn !bg-green-600 !text-white flex items-center gap-1 text-sm">
              <PiExportDuotone className="text-lg" />
            </button>
            <button className="custom-btn !bg-blue-500 !text-white flex items-center gap-1 text-sm">
              <PiPlus className="text-lg" />
            </button>
            <Search placeholder={"Search product ..."} />
          </div>
        </div>
        <div className="my-3">
          <Divider />
        </div>
        <ProductList />
      </Box>
      <Box className={"bg-white"}>
        <div className="flex justify-between items-center">
          <p className="heading-1">Recent Orders</p>
          <Search placeholder={"Search order ID"} />
        </div>
        <div className="my-3">
          <Divider />
        </div>
        <OrderList />
      </Box>
      <Box className={"bg-white"}>
        <div className="flex justify-between items-center">
          <p className="heading-1">Total Users vs Total Sales</p>
          <div className="flex items-center gap-4 m-4">
            <p className="text-[13px] flex gap-2 items-center">
              <GoDotFill className="text-[#82ca9d]" /> Total Users
            </p>
            <p className="text-[13px] flex gap-2 items-center">
              <GoDotFill className="text-[#8884d8]" /> Total Sales
            </p>
          </div>
        </div>
        <div className="my-3">
          <Divider />
        </div>

        <LinesChart data={lineChartData} />
      </Box>
    </div>
  );
};

export default Dashboard;
