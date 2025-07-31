import React from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../components/Reusables/BreadCrumb";
import { IoHomeOutline } from "react-icons/io5";
import Sidebar from "../../components/SideBar";

const ProductsListing = () => {
  const { category } = useParams();

  return (
    <div className="max-w-full">
      <div className="breadcrump p-5">
        <BreadCrumb />
        <div className="w-1/6">
        <Sidebar/>
        </div>
        {/* <div className="box border-1 w-full flex justify-center items-center min-h-10 rounded-xl">
            <div className="col1"></div>
            <div className="col2"></div>
            <div className="col3"></div>
        </div> */}
      </div>
    </div>
  );
};

export default ProductsListing;
