import React, { useEffect, useState } from "react";
import ProductList from "../../Dashboard/ProductList";
import BreadCrumb from "../../../Components/Reusables/Elements/BreadCrumb";
import { PiExport, PiPlus } from "react-icons/pi";
import Search from "../../../Components/Reusables/Search";
import useProducts from "../../../Components/hooks/useProducts";
import Box from "../../../Components/Reusables/Elements/Box";
import CustomButton from "../../../Components/Reusables/Elements/CustomBtn";
import DropDownField from "../../../Components/Reusables/DropDownField";
import Spinner from "../../../Components/Reusables/Elements/Loader/Spinner";
import NoProducts from "../../../assets/noProducts.png";
import PaginationFilter from "../../../Components/Filters/Pagination";
import { RiResetLeftFill } from "react-icons/ri";
import { Tooltip } from "@mui/material";
import { CiExport, CiTrash } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import CollapsablePanel from "../../../Components/Reusables/CollapsablePanel";
import FitlerSection from "../../../Components/Reusables/FilterSection";
import ProductFilters from "../../../Components/Filters/ProductFilters";
const Products = () => {
  const { products, loading, getProducts } = useProducts();
  const [query, setQuery] = useState("");
  useEffect(() => {
    getProducts(query);
  }, [query]);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <BreadCrumb addBreadCrumb={"List"} />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-gray-600 font-medium text-xl">Products</p>
        <div className="flex gap-3 items-center">
          <CustomButton
            type={"button"}
            title={
              <Tooltip title="Export file">
                <div className="flex gap-1 items-center">
                  <CiExport size={17} />
                  Export
                </div>
              </Tooltip>
            }
            className="custom-btn custom-border flex items-center gap-2 !bg-transparent text-black! text-sm font-[500] border! border-gray-400! rounded-md! hover:text-black!"
            fontSize={12}
            textPadding={1}
            fontWeight={500}
          />
          <CustomButton
            // disabled={true}
            onClick={() => navigate("/categories/add")}
            type="button"
            className="custom-btn custom-border flex items-center gap-2 !bg-red-400 text-sm font-[500] rounded-md! hover:text-white!"
            title={
              <Tooltip title="Delete Category">
                <div className="flex gap-1 items-center">
                  <CiTrash size={20} />
                  Delete
                </div>
              </Tooltip>
            }
            fontSize={12}
            textPadding={1}
            fontWeight={500}
          />
          <CustomButton
            // disabled={true}
            onClick={() => navigate("/categories/add")}
            type="button"
            className="custom-btn custom-border flex items-center gap-2 !bg-orange-400 text-sm font-[500] rounded-md! hover:text-white!"
            title={
              <Tooltip title="Edit Multiple Categories">
                <div className="flex gap-1 items-center">
                  <FaRegEdit size={20} />
                  Bulk Edit
                </div>
              </Tooltip>
            }
            fontSize={12}
            textPadding={1}
            fontWeight={500}
          />
          <CustomButton
            onClick={() => navigate("/categories/add")}
            type="button"
            className="custom-btn custom-border flex items-center gap-2 !bg-blue-500 text-sm font-[500] rounded-md! hover:text-white!"
            title={
              <Tooltip title="Add New Product">
                <div className="flex gap-1 items-center">
                  <PiPlus size={17} />
                  Add Product
                </div>
              </Tooltip>
            }
            fontSize={12}
            textPadding={1}
            fontWeight={400}
          />
        </div>
      </div>
      <ProductFilters getQuery={setQuery} />
      <Box className={"space-y-4 bg-white dark:bg-black rounded-sm!"}>
        {loading ? (
          <div className="flex justify-center items-center p-4">
            <Spinner size={40} />
          </div>
        ) : products?.products?.length > 0 ? (
          <ProductList products={products?.products} />
        ) : (
          <div className="text-center text-gray-500 font-semibold">
            <img
              src={NoProducts}
              alt="No Products found."
              className="w-100 h-auto mx-auto dark:invert-100"
            />
          </div>
        )}
        <div className="flex justify-center items-center">
          <PaginationFilter />
        </div>
      </Box>
    </div>
  );
};

export default Products;
