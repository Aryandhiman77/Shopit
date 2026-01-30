import DashboardHeader from "./Header";
import Layout from "./Layout/index";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import Box from "../../components/Reusables/Elements/Box";
import ProductList from "./ProductList";
import DropDownField from "../../components/Reusables/DropDownField";
import {
  PiChartPieSliceDuotone,
  PiExportDuotone,
  PiGiftDuotone,
  PiPlus,
  PiUserDuotone,
  PiUserListDuotone,
  PiUsersThreeDuotone,
} from "react-icons/pi";
import { IoStatsChart } from "react-icons/io5";
import { BsGraphDownArrow, BsGraphUpArrow, BsPlus } from "react-icons/bs";
import Card from "./Card";
import Search from "../../components/Reusables/Elements/Search";
import { Divider } from "@mui/material";
import Linechart from "../../components/Reusables/Recharts/Linechart";
import useChartData from "../../hooks/useChartData";
import { CalendarClock, Menu } from "lucide-react";
import CustomMenu from "../../components/Reusables/CustomMenu";
import MButton from "../../components/Reusables/Elements/MButton";
import TopProductList from "../Dashboard/TopProductList";
import "./style.css";

const Dashboard = () => {
  const { user } = useAuth();
  const { lineChartData } = useChartData();
  return (
    // <Layout>
    <div className="w-full space-y-4">
      <h1 className="text-3xl text-[500]">
        Welcome, <span className="font-semibold capitalize">{user.name}</span> !
      </h1>
      <p className="text-gray-500 mt-2">
        Manage your products, orders and analytics here.
      </p>
      <div className="flex flex-row gap-4">
        <Card
          title="Orders"
          value="3432"
          startIcon={<PiGiftDuotone className="text-5xl text-blue-500" />}
          endIcon={<IoStatsChart className="text-6xl text-blue-700" />}
        />
        <Card
          title="Sales"
          value="₹13,999"
          startIcon={
            <PiChartPieSliceDuotone className="text-5xl text-green-500" />
          }
          endIcon={<IoStatsChart className="text-6xl text-green-700" />}
        />
        <Card
          title="Users"
          value="233"
          startIcon={<PiUsersThreeDuotone className="text-5xl text-blue-500" />}
          endIcon={<IoStatsChart className="text-6xl text-blue-700" />}
        />
      </div>
      <div className="flex gap-5 max-h-127.5">
        <Box className={"bg-white dark:bg-gray-900"}>
          <div className="flex justify-between items-center">
            <p className="heading-1 dark:text-white! pb-3">Sales Report</p>
            <div className="flex items-center gap-2">
              <div className="flex flex-row gap-2">
                <div className="rounded-full p-2 bg-primary"></div>
                <div className="text-[12px] font-normal">Sales</div>
              </div>
              <CustomMenu
                title={<Menu size={18} />}
                btnClasses={"border-none!"}
                tooltip={"Select Duration"}
              >
                <div className="dark:bg-gray-900">
                  <MButton
                    title="Past 7 days"
                    className={"dark:bg-gray-900! hover:dark:bg-black!"}
                  />
                  <MButton
                    title="Past 1 month"
                    className={"dark:bg-gray-900! hover:dark:bg-black!"}
                  />
                  <MButton
                    title="Past 6 montns"
                    className={"dark:bg-gray-900! hover:dark:bg-black!"}
                  />
                  <MButton
                    title="custom"
                    className={"dark:bg-gray-900! hover:dark:bg-black!"}
                    startIcon={<CalendarClock size={16} />}
                  />
                </div>
              </CustomMenu>
            </div>
          </div>
          <Linechart data={lineChartData} />
        </Box>
        <Box
          className={
            "w-full bg-white dark:bg-gray-900 overflow-y-auto custom-scrollbar"
          }
        >
          <div className="flex justify-between items-center pb-3">
            <p className="heading-1 dark:text-white!">Top-Selling Product</p>
            <button className="custom-border custom-btn text-[12px]">
              See All Products
            </button>
          </div>
          <TopProductList />
        </Box>
      </div>
      <Box className={"bg-white dark:bg-gray-700 dark:border-black!"}>
        <div className="flex justify-between items-center">
          <p className="heading-1 dark:text-white!">Product List</p>
          <div className="flex flex-row items-center gap-3">
            <button className="custom-btn bg-green-600! text-white! flex items-center gap-1 text-sm">
              <PiExportDuotone className="text-lg" />
            </button>
            <button className="custom-btn bg-blue-500! text-white! flex items-center gap-1 text-sm">
              <PiPlus className="text-lg" />
            </button>
            <Search placeholder={"Search product ..."} />
          </div>
        </div>
        <div className="my-3">
          <Divider className="dark:bg-gray-400" />
        </div>
        <ProductList />
      </Box>
    </div>
    // </Layout>
  );
};

export default Dashboard;
