import React from "react";
import { Divider } from "@mui/material";
import CategoryForm from "../../../Components/CategoryForm/CategoryForm";
import BreadCrumb from "../../../Components/Reusables/Elements/BreadCrumb";
import Box from "../../../Components/Reusables/Elements/Box";

const AddCategory = () => {
  return (
    <div className="space-y-5">
      <BreadCrumb />
      <Box className="flex flex-col gap-2 bg-white! rounded-sm!">
        <div className="font-medium text-gray-500 text-lg pb-4">
          Add Category
        </div>
        <CategoryForm mode="add" />
      </Box>
    </div>
  );
};

export default AddCategory;
