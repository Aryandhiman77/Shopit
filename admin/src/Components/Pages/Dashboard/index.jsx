import React from "react";
import Box from "../../Reusables/Elements/Box";
import { BsGraphDownArrow, BsGraphUpArrow, BsPlus } from "react-icons/bs";
import image from "../../../assets/dashboard-main.webp";
import {
  PiBankDuotone,
  PiChartPieSliceDuotone,
  PiGiftDuotone,
} from "react-icons/pi";
import { IoStatsChart } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import Search from "../../Reusables/Search";
import { Divider } from "@mui/joy";
import Table from "../../Table";
import Row from "../../Table/Row";

const Dashboard = () => {
  const ordersData = [{
    orderId: "#32422432",
    paymentId: 32422432,
    username: "Aryan Dhiman",
    phoneNumber: "+91 123456789",
    items: [{
      image:"https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-pro-2-hero-select-202409_FMT_WHH?wid=750&hei=556&fmt=jpeg&qlt=90&.v=1724041668836",
      name:"Apple Airpods 2nd generation",
      quantity:1,
      price:"₹ 23,999",
      status: "pending",
    }
  ],
    price: 2000,
    createdAt: "September 2,2025",
    modifiedAt: "September 2,2025",
  },
  {
    orderId: "#32422432",
    paymentId: 32422432,
    username: "Aryan Dhiman",
    phoneNumber: "+91 123456789",
    items: [{
      image:"https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-pro-2-hero-select-202409_FMT_WHH?wid=750&hei=556&fmt=jpeg&qlt=90&.v=1724041668836",
      name:"Apple Airpods 2nd generation",
      quantity:1,
      price:"₹ 23,999",
      status: "pending",
    }
  ],
    price: 2000,
    createdAt: "September 2,2025",
    modifiedAt: "September 2,2025",
  },{
    orderId: "#32422432",
    paymentId: 32422432,
    username: "Aryan Dhiman",
    phoneNumber: "+91 123456789",
    items: [{
      image:"https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-pro-2-hero-select-202409_FMT_WHH?wid=750&hei=556&fmt=jpeg&qlt=90&.v=1724041668836",
      name:"Apple Airpods 2nd generation",
      quantity:1,
      price:"₹ 23,999",
      status: "pending",
    }
  ],
    price: 2000,
    createdAt: "September 2,2025",
    modifiedAt: "September 2,2025",
  },{
    orderId: "#32422432",
    paymentId: 32422432,
    username: "Aryan Dhiman",
    phoneNumber: "+91 123456789",
    items: [{
      image:"https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-pro-2-hero-select-202409_FMT_WHH?wid=750&hei=556&fmt=jpeg&qlt=90&.v=1724041668836",
      name:"Apple Airpods 2nd generation",
      quantity:1,
      price:"₹ 23,999",
      status: "pending",
    }
  ],
    price: 2000,
    createdAt: "September 2,2025",
    modifiedAt: "September 2,2025",
  },{
    orderId: "#32422432",
    paymentId: 32422432,
    username: "Aryan Dhiman",
    phoneNumber: "+91 123456789",
    items: [{
      image:"https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-pro-2-hero-select-202409_FMT_WHH?wid=750&hei=556&fmt=jpeg&qlt=90&.v=1724041668836",
      name:"Apple Airpods 2nd generation",
      quantity:1,
      price:"₹ 23,999",
      status: "pending",
    }
  ],
    price: 2000,
    createdAt: "September 2,2025",
    modifiedAt: "September 2,2025",
  },{
    orderId: "#32422432",
    paymentId: 32422432,
    username: "Aryan Dhiman",
    phoneNumber: "+91 123456789",
    items: [{
      image:"https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-pro-2-hero-select-202409_FMT_WHH?wid=750&hei=556&fmt=jpeg&qlt=90&.v=1724041668836",
      name:"Apple Airpods 2nd generation",
      quantity:1,
      price:"₹ 23,999",
      status: "pending",
    },
    {
      image:"https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-pro-2-hero-select-202409_FMT_WHH?wid=750&hei=556&fmt=jpeg&qlt=90&.v=1724041668836",
      name:"Apple Airpods 2nd generation",
      quantity:1,
      price:"₹ 23,999",
      status: "shipped",
    },
    
    {
      image:"https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-pro-2-hero-select-202409_FMT_WHH?wid=750&hei=556&fmt=jpeg&qlt=90&.v=1724041668836",
      name:"Apple Airpods 2nd generation",
      quantity:1,
      price:"₹ 23,999",
      status: "delivered",
    },
    {
      image:"https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-pro-2-hero-select-202409_FMT_WHH?wid=750&hei=556&fmt=jpeg&qlt=90&.v=1724041668836",
      name:"Apple Airpods 2nd generation",
      quantity:1,
      price:"₹ 23,999",
      status: "cancelled",
    },
    {
      image:"https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-pro-2-hero-select-202409_FMT_WHH?wid=750&hei=556&fmt=jpeg&qlt=90&.v=1724041668836",
      name:"Apple Airpods 2nd generation",
      quantity:1,
      price:"₹ 23,999",
      status: "refunded",
    },
    
  ],
    price: 2000,
    createdAt: "September 2,2025",
    modifiedAt: "September 2,2025",
  },
];
  return (
    <div className="px-4 my-1 flex flex-col gap-y-5 w-full">
      <Box className={"flex justify-between items-center"}>
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
        <Box className={" w-1/3"}>
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
        <Box className={" w-1/3"}>
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
        <Box className={" w-1/3"}>
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
      <Box className={"relative"}>
        <div className="flex justify-between items-center">
          <p className="heading-1">Recent Orders</p>
          <Search placeholder={"Search order ID"} />
        </div>
        <div className="my-3">
          <Divider />
        </div>

        <Table
          attributes={[
            "",
            "Order ID",
            "Payment ID",
            "Username",
            "Phone Number",
            "Items",
            "Price",
            "Created at",
            "Modified at",
            "Operations",
          ]}
        >
          {ordersData?.map((order,i) => (
            <Row order={order} key={i}/>
          ))}
        </Table>
      </Box>

      {/* <Box className={"relative overflow-auto"}> */}

      {/* <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-[70%]">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="p-4">
                    <div class="flex items-center">
                        <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label for="checkbox-all-search" class="sr-only">checkbox</label>
                    </div>
                </th>
                <th scope="col" class="px-6 py-3">
                    Product name
                </th>
                <th scope="col" class="px-6 py-3">
                    Color
                </th>
                <th scope="col" class="px-6 py-3">
                    Category
                </th>
                <th scope="col" class="px-6 py-3">
                    Accessories
                </th>
                <th scope="col" class="px-6 py-3">
                    Available
                </th>
                <th scope="col" class="px-6 py-3">
                    Price
                </th>
                <th scope="col" class="px-6 py-3">
                    Weight
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="checkbox-table-search-3" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label for="checkbox-table-search-3" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    AirTag
                </th>
                <td class="px-6 py-4">
                    Silver
                </td>
                <td class="px-6 py-4">
                    Accessories
                </td>
                <td class="px-6 py-4">
                    Yes
                </td>
                <td class="px-6 py-4">
                    No
                </td>
                <td class="px-6 py-4">
                    $29
                </td>
                <td class="px-6 py-4">
                    53 g
                </td>
                <td class="flex items-center px-6 py-4">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    <a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</a>
                </td>
            </tr>
        </tbody>
    </table>
</div> */}

      {/* </Box> */}
    </div>
  );
};

export default Dashboard;
