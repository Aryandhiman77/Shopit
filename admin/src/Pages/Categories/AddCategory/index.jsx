import React from "react";
import { Divider } from "@mui/material";
import CategoryForm from "../../../Components/CategoryForm/CategoryForm";
import BreadCrumb from "../../../Components/Reusables/Elements/BreadCrumb";

const AddCategory = () => {
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-[700] text-gray-600">Add Category</h1>
      </div>
      <CategoryForm mode="add" />
    </div>
  );
};

export default AddCategory;
