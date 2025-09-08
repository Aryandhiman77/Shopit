
import {
  PiExport,
  PiPlus,
} from "react-icons/pi";
import { Link } from "react-router-dom";
import OrderList from "../Dashboard/OrderList";
import BreadCrumb from "../../Reusables/Elements/BreadCrumb";
import Search from "../../Reusables/Search";

const Orders = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-[700] text-black">Orders</h1>
          <BreadCrumb addBreadCrumb={"List"} />
        </div>
        <div>
          <Link
            to={"/"}
            className="custom-btn custom-border flex items-center gap-2 !bg-green-600 !text-white text-sm font-[500]"
          >
            <PiExport />
            Export{" "}
          </Link>
        </div>
      </div>
      <div className="w-[20%]">
        <Search placeholder={"Search Order ..."} />
      </div>
      <OrderList />
    </div>
  );
};

export default Orders;
