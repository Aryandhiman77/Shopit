import DashboardHeader from "./Header";
import Layout from "./Layout/index";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import Box from "../../components/Reusables/Elements/Box";
import ProductList from "./ProductList";
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

const Dashboard = () => {
  const { user } = useAuth();
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
