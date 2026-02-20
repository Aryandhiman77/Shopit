import React, { useState } from "react";
import { TextField, Button, FormControlLabel, Switch } from "@mui/material";
import DropDownField from "../../../components/Reusables/DropDownField";
import ImageDropBox from "../../../components/Reusables/ImageDropBox";
import categoryValidationSchema from "../validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormError from "../../../components/Reusables/FormError";
const AddCategory = () => {
  const {
    register,
    handleSubmit,
    formState: errors,
  } = useForm({ resolver: yupResolver });

  const onSubmit = (data) => {
    console.log("Category Data:", data);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-black">Add Category</h1>
        {/* <BreadCrumb addBreadCrumb="Add Category" /> */}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          x
          <TextField
            {...register("name")}
            name="name"
            label="Category Name"
            variant="outlined"
            required
            onChange={(e) => setCategoryName(e.target.value)}
            size="small"
          />
          <FormError error={errors.name?.message} />
        </div>
        <div>
          <TextField
            {...register("description")}
            name="description"
            label="Description"
            variant="outlined"
            multiline
            rows={3}
            onChange={(e) => setDescription(e.target.value)}
            size="small"
          />
          <FormError error={errors.description?.message} />
        </div>
        <div className="w-[30%]">
          <ImageDropBox />
        </div>
        <div>
          <FormControlLabel control={<Switch color="primary" />} />
          <FormError error={errors.isActive?.message} />
        </div>
        <Button variant="contained" color="primary" type="submit">
          Add Category
        </Button>
      </form>
    </div>
  );
};

export default AddCategory;
