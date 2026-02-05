import React, { useEffect } from "react";
import Table from "../../../Components/Table";
import CategoryRow from "../../../Components/Table/CategoryRow";
import { Link } from "react-router-dom";
import { PiExport } from "react-icons/pi";
import Search from "../../../Components/Reusables/Search";
import BreadCrumb from "../../../Components/Reusables/Elements/BreadCrumb";
import useData from "../../../Components/hooks/useData";
import Box from "../../../Components/Reusables/Elements/Box";
import { Divider } from "@mui/material";
import CustomButton from "../../../Components/Reusables/Elements/CustomBtn";
import Spinner from "../../../Components/Reusables/Elements/Loader/Spinner";

const CategoryList = () => {
  const {
    level1Categories,
    level2Categories,
    level3Categories,
    getCategoriesByLevel,
    isLoading,
  } = useData();
  useEffect(() => {
    getCategoriesByLevel(1);
    getCategoriesByLevel(2);
    getCategoriesByLevel(3);
  }, []);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-[700] text-black">Categories</h1>
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
        </div>
      </div>
      <div className="w-[20%]">
        <Search placeholder={"Search Category ..."} />
      </div>
      <Box className="space-y-4 bg-white">
        <div className="flex justify-between items-center">
          <p className="text-gray-500 font-semibold text-xl">
            Top level Categories
          </p>
          <CustomButton
            type="button"
            bg={"#9ca1dc"}
            title={"+ Add Top-level-Category"}
            fontSize={12}
          />
        </div>
        <Divider className="mb-4!" />
        {isLoading("level-1-categories") ? (
          <div className="flex justify-center items-center p-4">
            <Spinner />
          </div>
        ) : level1Categories?.length > 0 ? (
          <Table
            attributes={[
              "Image",
              "Category Name",
              // "Sub-Category",
              // "Leaf-Category",
              "Status",
              "Created At",
              "Modified At",
              "Operations",
            ]}
          >
            {level1Categories.map((cat) => (
              <>{<CategoryRow category={cat} />}</>
            ))}
          </Table>
        ) : (
          <div className="text-center text-gray-500 font-semibold">
            No Categories found.
          </div>
        )}
      </Box>
    </div>
  );
};

export default CategoryList;
