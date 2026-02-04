import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControlLabel,
  Switch,
  TextareaAutosize,
} from "@mui/material";
import ImageDropBox from "../../../Components/Reusables/ImageDropBox";
import BreadCrumb from "../../../Components/Reusables/Elements/BreadCrumb";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import categoryValidationSchema from "../validation";
import FormError from "../../../Components/Reusables/FormError";
import CustomToggle from "../../../Components/Reusables/Elements/ToggleSwitch";

const AddCategory = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(categoryValidationSchema) });

  const [isActive, setIsActive] = useState(false);
  const [images, setImages] = useState(null);
  const onSubmit = (data) => {
    if (!images) {
    }
    console.log("Category Data:", data);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-[700] text-black">Add Category</h1>
        <BreadCrumb addBreadCrumb="Add Category" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 ">
        <div className="w-full">
          <TextField
            className="w-1/2"
            {...register("name")}
            name="name"
            label="Category Name"
            variant="outlined"
            required
            size="small"
          />
          <FormError error={errors.name?.message} />
        </div>

        <div className="w-full">
          <TextField
            className="w-full"
            {...register("description")}
            name="description"
            label="Description"
            variant="outlined"
            multiline
            rows={3}
            size="small"
          />
          <FormError error={errors.description?.message} />
        </div>

        <div className="w-[30%]">
          <ImageDropBox setImages={setImages} maxFiles={1} />
        </div>
        <div className="w-full">
          {/* <Switch
            className="bg-red-500!"
           
            color="primary"
            onClick={() => setIsActive(!isActive)}
          />
          {isActive ? (
            <span className="text-green-600">Active</span>
          ) : (
            <span className="text-red-600">Inactive</span>
          )} */}
          <CustomToggle defaultChecked={isActive} setValue={setValue} />
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
