import React, { useEffect, useState } from "react";
import { Divider, TextField } from "@mui/material";
import BreadCrumb from "../Reusables/Elements/BreadCrumb";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import categoryValidationSchema from "./validation";
import toast from "react-hot-toast";
import CustomButton from "../Reusables/Elements/CustomBtn";
import CategoryAttributes from "./AttributeForm";
import Box from "../Reusables/Elements/Box";
import Table from "../Table";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import MenuItem from "@mui/material/MenuItem";
import FormError from "../Reusables/FormError";
import ImageDropBox from "../Reusables/ImageDropBox";
import { useNavigate } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import BackendErrors from "../Reusables/Elements/BackendErrors";
import SelectableInput from "../Reusables/SelectableInput";
import useBrands from "../hooks/useBrands";

const CategoryForm = ({ mode = "add", updationBrand = {}, setEditModal }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(brandValidationSchema) });

  const navigate = useNavigate();
  const {
    addCategory,
    isLoading,
    getCategoriesByLevel,
    level2Categories,
    level1Categories,
    updateCategory,
    formErrors,
    resetFormErrors,
  } = useCategory();

  const { loading } = useBrands();

  const [images, setImages] = useState([]);
  const [resetDropBox, setResetDropBox] = useState(false);

  const [editIndex, setEditIndex] = useState(-1);

  const resetFormStates = () => {
    reset();
    setEditIndex(-1);
    setResetDropBox(true);
    setImages([]);
  };

  const onSubmit = async (data) => {
    if (images.length === 0) {
      return toast.error("Image is required.");
    }
    const update = await updateCategory(data);
    if (update) {
      resetFormStates();
      setEditModal(false);
    }
  };

  useEffect(() => {
    getCategoriesByLevel(1);
    getCategoriesByLevel(2);
    getCategoriesByLevel(3);
    return () => {
      resetFormErrors();
      setEditModal(false);
    };
  }, []);
  useEffect(() => {
    if (mode !== "edit" && updationCategory.level > 1) return;
  }, [mode]);
  return (
    <>
      <div className="flex flex-col gap-4">
        <BackendErrors formErrors={formErrors} />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full "
        >
          <>
            <div className="flex items-center gap-4 w-full">
              <TextField
                className="w-full bg-white"
                {...register("name")}
                name="name"
                defaultValue={mode === "edit" ? updationBrand.name : ""}
                label="Category Name"
                variant="outlined"
                required
                size="small"
              />
              <FormError error={errors.name?.message} />
            </div>
          </>

          <>
            <TextField
              className="w-full bg-white"
              {...register("description")}
              defaultValue={mode === "edit" ? updationBrand.description : ""}
              name="description"
              label="Description"
              variant="outlined"
              multiline
              rows={3}
              size="small"
            />
            <FormError error={errors.description?.message} />
          </>

          <div className="w-[30%]">
            <ImageDropBox
              initialImages={mode === "edit" ? [updationBrand?.image?.url] : []}
              setImages={setImages}
              maxFiles={1}
            />
          </div>
          <div>
            <CustomToggle
              checked={brand.isActive}
              loading={loading}
              disabled={loading}
              //   onChange={(val) => handleStatusChange(val)}
            />
            <CustomToggle
              checked={brand.isActive}
              loading={loading}
              disabled={loading}
              //   onChange={(val) => handleStatusChange(val)}
            />
          </div>
          <div className="mx-auto">
            <CustomButton
              title={mode === "edit" ? "Save Changes" : "AddCategory"}
              loading={loading}
              disabled={loading || editIndex > -1 || isAddAttributeFormEnabled}
              type={"submit"}
              className={"rounded-0! bg-primary! w-70"}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default CategoryForm;
