import React, { useEffect, useState } from "react";
import { Divider, FormControlLabel, TextField } from "@mui/material";
import BreadCrumb from "../Reusables/Elements/BreadCrumb";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import CustomButton from "../Reusables/Elements/CustomBtn";
import FormError from "../Reusables/FormError";
import ImageDropBox from "../Reusables/ImageDropBox";
import { useNavigate } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import BackendErrors from "../Reusables/Elements/BackendErrors";
import useBrands from "../hooks/useBrands";
import brandValidationSchema from "./validation";
import CustomToggle from "../Reusables/Elements/CustomToggle";
import SelectableInput from "../Reusables/SelectableInput";

const BrandForm = ({
  mode = "add",
  updationBrand = {},
  setEditModal = () => {},
}) => {
  const prepareUpdationData = () => {
    if (mode !== "edit") return;
    const { name, description, isVerified, isActive } = updationBrand;
    let updationBrandDefaultData = mode === "edit" && {
      name,
      description,
      isVerified,
      isActive,
      categories: updationBrand?.categories?.map((cat) => ({
        label: cat.name,
        value: cat._id,
      })),
    };
    return updationBrandDefaultData;
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(brandValidationSchema),
    defaultValues: prepareUpdationData(),
  });

  const navigate = useNavigate();
  const {
    getCategoriesByLevel,
    level3Categories,
    level2Categories,
    level1Categories,
  } = useCategory();

  const { isLoading, resetFormErrors, createBrand, formErrors, updateBrand } =
    useBrands();

  const [images, setImages] = useState([]);
  const [resetDropBox, setResetDropBox] = useState(false);
  const [booleanData, setBooleanData] = useState({
    active: updationBrand?.isActive || false,
    verified: updationBrand?.isVerified || false,
  });

  const allCategories = [
    ...(level1Categories || []),
    ...(level2Categories || []),
    ...(level3Categories || []),
  ];

  const categoryOptions = allCategories?.map((cat) => ({
    label: cat.name,
    value: cat._id,
  }));

  const resetFormStates = () => {
    reset();
    setResetDropBox(true);
    setImages([]);
    setEditModal(false);
  };

  const onSubmit = async (data) => {
    resetFormErrors();
    if (mode === "edit" && Object.keys(updationBrand).length > 0) {
      const formdata = {
        ...data,
        logo: images[0] instanceof File ? images[0] : undefined,
        isActive: booleanData.active,
        isVerified: booleanData.verified,
        categories: [...data.categories?.map((cat) => cat.value)],
      };

      const update = await updateBrand(updationBrand._id, formdata);
      if (update) {
        resetFormStates();
      }
      return;
    }

    if (images.length === 0) {
      return toast.error("Image is required.");
    }
    const details = {
      ...data,
      image: images[0],
      isActive: booleanData.active,
      isVerified: booleanData.verified,
      categories: JSON.stringify([...data.categories?.map((cat) => cat.value)]),
    };
    const created = await createBrand(details);
    if (created) {
      resetFormStates();
      navigate("/brands");
    }
    console.log(details);
  };

  useEffect(() => {
    getCategoriesByLevel(1);
    getCategoriesByLevel(2);
    getCategoriesByLevel(3);
    return () => {
      resetFormErrors();
    };
  }, []);
  return (
    <>
      <div className="flex flex-col gap-4">
        <BackendErrors formErrors={formErrors} />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full "
        >
          <>
            <div className="w-full">
              <TextField
                error={errors.name?.message}
                className="w-full bg-white"
                {...register("name")}
                name="name"
                label="Brand Name"
                variant="outlined"
                // required
                size="small"
              />
              <FormError error={errors.name?.message} />
            </div>
          </>

          <>
            <TextField
              className="w-full bg-white"
              {...register("description")}
              name="description"
              label="Description"
              variant="outlined"
              multiline
              rows={3}
              size="small"
            />
            <FormError error={errors.description?.message} />
          </>
          <>
            <SelectableInput
              disableCloseOnSelect={true}
              // required={true}
              control={control}
              defaultValue={
                (updationBrand?.categories?.length && {}) || undefined
              }
              error={errors.categories?.message}
              name={"categories"}
              label={"Categories"}
              options={categoryOptions}
              getValue={(value) =>
                setValue("categories", value, { shouldValidate: true })
              }
            />
            <FormError error={errors.categories?.message} />
          </>
          <div className="w-[30%]">
            <ImageDropBox
              resetDropBox={resetDropBox}
              setResetDropBox={setResetDropBox}
              initialImages={mode === "edit" ? [updationBrand?.logo?.url] : []}
              setImages={setImages}
              maxFiles={1}
            />
          </div>
          <div className="w-60 space-y-5">
            <CustomToggle
              disableIcons={true}
              checked={booleanData.active}
              onChange={(value) => {
                setBooleanData({ ...booleanData, active: value });
              }}
            />
            <CustomToggle
              activeText="Verified"
              inActiveText="Not Verified"
              disableIcons={true}
              checked={booleanData.verified}
              onChange={(value) =>
                setBooleanData({ ...booleanData, verified: value })
              }
            />
          </div>
          <div className="mx-auto">
            <CustomButton
              title={mode === "edit" ? "Save Changes" : "Add Brand"}
              loading={isLoading(`update-${updationBrand?._id}-brand`)}
              disabled={isLoading(`update-${updationBrand?._id}-brand`)}
              type={"submit"}
              className={"rounded-2xl! bg-blue-500! w-70"}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default BrandForm;
