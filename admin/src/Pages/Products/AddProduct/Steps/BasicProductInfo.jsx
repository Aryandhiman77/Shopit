import React, { useEffect } from "react";
import SelectableInput from "../../../../Components/Reusables/SelectableInput";
import { Divider, TextareaAutosize, TextField } from "@mui/material";
import useCategory from "../../../../Components/hooks/useCategory";
import useBrands from "../../../../Components/hooks/useBrands";
import Box from "../../../../Components/Reusables/Elements/Box";
import FormError from "../../../../Components/Reusables/FormError";
import CustomToggle from "../../../../Components/Reusables/Elements/CustomToggle";

const BasicProductInfo = ({
  defaultData,
  register,
  errors,
  setValue,
  watch,
  control,
}) => {
  const {
    getCategoriesByLevel,
    isLoading,
    level1Categories,
    level2Categories,
    level3Categories,
  } = useCategory();
  const { getBrandsListing, loading, brandListing } = useBrands();

  //-------------------------- category options------------------------------
  const optionsLevel1Categories = level1Categories?.map((item) => ({
    label: item.name,
    value: item._id,
  }));
  const optionsLevel2Categories = level2Categories?.map((item) => ({
    label: item.name,
    value: item._id,
  }));
  const optionsLevel3Categories = level3Categories?.map((item) => ({
    label: item.name,
    value: item._id,
  }));
  const categoryOptions = [
    ...(optionsLevel1Categories || []),
    ...(optionsLevel2Categories || []),
    ...(optionsLevel3Categories || []),
  ];

  //-------------------------- category options------------------------------

  //-------------------------- Brand options------------------------------
  const optionsBrands = brandListing?.map((item) => ({
    label: item.name,
    value: item._id,
  }));

  // discount logic
  let discount = 0;

  discount =
    watch("base_mrp") &&
    watch("base_price") &&
    Number(
      ((watch("base_mrp") - watch("base_price")) / watch("base_mrp")) * 100,
    ).toFixed(1);

  useEffect(() => {
    getCategoriesByLevel(1);
    getCategoriesByLevel(2);
    getCategoriesByLevel(3);
    getBrandsListing();
  }, []);
  return (
    <>
      <Box className={"bg-white mb-25"}>
        <div className="font-medium text-gray-500 text-lg pb-4">Summary</div>
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-row gap-10">
            <div className="w-1/2">
              <TextField
                error={errors.title?.message}
                className="w-full"
                label="Product Title"
                variant="outlined"
                required={true}
                {...register("title")}
                size="small"
                type={"text"}
              />
              <FormError className={"h-auto!"} error={errors.title?.message} />
            </div>
            <div className="w-1/2">
              <SelectableInput
                control={control}
                defaultValue={defaultData?.brand}
                error={errors.brand?.message}
                multiple={false}
                name={"brand"}
                // required={true}
                label={"Brand"}
                options={!loading && optionsBrands}
                getValue={(value) => {
                  setValue("brand", value, { shouldValidate: true });
                }}
                loading={loading}
              />
              <FormError className={"h-auto!"} error={errors.brand?.message} />
            </div>
          </div>
          <div className="flex flex-row gap-10">
            <SelectableInput
              disableCloseOnSelect={true}
              control={control}
              defaultValue={defaultData?.categories}
              error={errors.categories?.message}
              name={"categories"}
              label={"Categories"}
              options={
                !isLoading("level1categories") &&
                !isLoading("level2categories") &&
                !isLoading("level3categories") &&
                categoryOptions
              }
              getValue={(value) =>
                setValue("categories", value, { shouldValidate: true })
              }
              loading={isLoading("level1categories")}
            />
          </div>
          <FormError
            className={"h-auto!"}
            error={
              errors.categories?.message ||
              errors.subCategories?.message ||
              errors.leafCategories?.message
            }
          />
          <>
            <TextareaAutosize
              id="message"
              name="shortDescription"
              required
              minRows={3}
              className={`block w-full px-2.5 pt-2.5 text-sm rounded-lg bg-gray-50 text-gray-900 border
              focus:outline-none
              ${
                errors.shortDescription?.message
                  ? "border-red-600 focus:border-red-600 focus:ring-1 focus:ring-red-600"
                  : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              }
               dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400`}
              placeholder="Write brief description about product in 400 characters."
              maxLength={400}
              {...register("shortDescription")}
            />
            <FormError
              className={"h-auto!"}
              error={errors.shortDescription?.message}
            />
          </>
          {/* </Box>
      <Box className={"bg-white"}>
        <h1 className="heading-1 py-4">Price</h1> */}
          <div className="flex flex-row gap-10">
            <div className="w-1/2">
              <TextField
                error={errors.base_mrp?.message}
                {...register("base_mrp")}
                name="base_mrp"
                className="w-full"
                label="MRP"
                variant="outlined"
                size="small"
                type={"number"}
              />
              <FormError
                className={"h-auto!"}
                error={errors.base_mrp?.message}
              />
            </div>
            <div className="w-1/2">
              <TextField
                {...register("base_price")}
                error={errors.base_price?.message}
                name="base_price"
                className="w-full"
                label="Selling Price (tax incl.)"
                variant="outlined"
                size="small"
                type={"number"}
              />
              <FormError error={errors.base_price?.message} />
            </div>

            {discount > 0 && (
              <div className="p-2 border w-1/3 rounded-sm">
                Discount : {discount}
              </div>
            )}
          </div>
        </div>
      </Box>
    </>
  );
};

export default BasicProductInfo;
