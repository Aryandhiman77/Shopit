import React, { useEffect } from "react";
import ProductList from "../../Dashboard/ProductList";
import BreadCrumb from "../../../Components/Reusables/Elements/BreadCrumb";
import {
  PiExport,
  PiExportDuotone,
  PiPlus,
  PiPlusDuotone,
} from "react-icons/pi";
import { Link } from "react-router-dom";
import Search from "../../../Components/Reusables/Search";
import useProducts from "../../../Components/hooks/useProducts";
import Box from "../../../Components/Reusables/Elements/Box";
import CustomButton from "../../../Components/Reusables/Elements/CustomBtn";
import DropDownField from "../../../Components/Reusables/DropDownField";
import Spinner from "../../../Components/Reusables/Elements/Loader/Spinner";

const Products = () => {
  const { products, loading, getProducts } = useProducts();
  useEffect(() => {
    getProducts(10, 1);
  }, []);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <BreadCrumb addBreadCrumb={"List"} />
        </div>
      </div>
      <Box className={"space-y-4 bg-white dark:bg-black rounded-sm!"}>
        <div className="flex items-center justify-between">
          <p className="text-gray-600 font-medium text-xl">Products</p>
          <div className="flex gap-3 items-center">
            <CustomButton
              type={"button"}
              title={
                <>
                  <PiExport />
                  Export
                </>
              }
              className="custom-btn custom-border flex items-center gap-2 !bg-green-600 !text-white text-sm font-[500]"
              fontSize={12}
            />

            <CustomButton
              onClick={() => navigate("/categories/add")}
              type="button"
              className="custom-btn custom-border flex items-center gap-2 !bg-blue-600 !text-white text-sm font-[500]"
              title={"Add Product"}
              fontSize={12}
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-5">
            <Search placeholder={"Search Products ..."} />
            <div className="w-30">
              <DropDownField
                defaultSelected={"All"}
                items={[
                  "All",
                  "Main Categories",
                  "Sub Categories",
                  "Leaf Categories",
                ]}
              />
            </div>
            <div className="w-30">
              <DropDownField
                defaultSelected={"Both"}
                items={["Active", "Inactive", "Draft"]}
              />
            </div>
          </div>
          <p className="text-gray-500 font-normal text-sm px-2">
            {products?.length ? <>Results : {products?.length}</> : ""}
          </p>
        </div>
        {loading ? (
          <div className="flex justify-center items-center p-4">
            <Spinner size={40} />
          </div>
        ) : products.length > 0 ? (
          <ProductList products={products} />
        ) : (
          <div className="text-center text-gray-500 font-semibold">
            No Products found.
          </div>
        )}
      </Box>
    </div>
  );
};

export default Products;
