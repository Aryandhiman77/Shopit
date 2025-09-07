import React from "react";
import ProductList from "../../Dashboard/ProductList";
import BreadCrumb from "../../../Reusables/Elements/BreadCrumb";
import {
  PiExport,
  PiExportDuotone,
  PiPlus,
  PiPlusDuotone,
} from "react-icons/pi";
import { Link } from "react-router-dom";
import Search from "../../../Reusables/Search";

const Products = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-[700] text-black">Products</h1>
          <BreadCrumb addBreadCrumb={"List"} />
        </div>
        <div className="flex flex-row gap-2">
          <Link
            to={"/"}
            className="custom-btn custom-border flex items-center gap-2 !bg-green-600 !text-white text-sm font-[500]"
          >
            <PiExport />
            Export{" "}
          </Link>
          <Link
            to={"/"}
            className="custom-btn custom-border flex items-center gap-2 !bg-blue-600 !text-white text-sm font-[500]"
          >
            <PiPlus />
            Add Product{" "}
          </Link>
        </div>
      </div>
      <div className="w-[20%]">
        <Search placeholder={"Search Products ..."} />
      </div>
      <ProductList />
    </div>
  );
};

export default Products;
