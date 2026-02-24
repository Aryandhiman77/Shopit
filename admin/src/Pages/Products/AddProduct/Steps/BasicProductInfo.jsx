import React, { useEffect, useState } from "react";
import SelectableInput from "../../../../Components/Reusables/SelectableInput";
import { TextField } from "@mui/material";
import useCategory from "../../../../Components/hooks/useCategory";
import useBrands from "../../../../Components/hooks/useBrands";
import Box from "../../../../Components/Reusables/Elements/Box";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { basicProductInfo } from "../validation";
import FormError from "../../../../Components/Reusables/FormError";

const BasicProductInfo = ({
  setProductData,
  productData,
  setCurrentProgress,
}) => {
  const {
    setValue,
    reset,
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(basicProductInfo),
  });

  const {
    getCategoriesByLevel,
    isLoading,
    level1Categories,
    level2Categories,
    level3Categories,
  } = useCategory();
  const { getBrandsListing, loading, brands } = useBrands();

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

  //-------------------------- category options------------------------------

  //-------------------------- Brand options------------------------------
  const optionsBrands = brands?.map((item) => ({
    label: item.name,
    value: item._id,
  }));

  //-------------------------- Brand options------------------------------
  let discount = 0;
  if (watch("base_mrp") && watch("base_price")) {
    discount = Number(
      100 -
        ((watch("base_mrp") - watch("base_price")) / watch("base_mrp")) * 100,
    ).toFixed(1);
  }
  // const watchAndSetProgress = (name) => {};
  const onSubmit = (data) => {
    const allCats = [data.categories, data.subCategories, data.leafCategories];
    delete data.categories;
    delete data.subCategories;
    delete data.leafCategories;
    setProductData({ ...productData, ...data, categories: allCats });
    setCurrentProgress(100);
  };
  useEffect(() => {
    getCategoriesByLevel(1);
    getCategoriesByLevel(2);
    getCategoriesByLevel(3);
    getBrandsListing();
  }, []);
  return (
    <>
      <div className="heading-1">Summary</div>
      <Box className={"bg-white"}>
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 "
        >
          <div className="flex flex-row gap-10">
            <div className="w-1/2">
              <TextField
                className="w-full"
                label="Product Title"
                variant="outlined"
                // required={true}
                size="small"
                type={"text"}
                onChange={(e) =>
                  setValue("title", e.target.value, { shouldValidate: true })
                }
              />
              <FormError className={"h-auto!"} error={errors.title?.message} />
            </div>
            <div className="w-1/2">
              <SelectableInput
                multiple={false}
                name={"Brand"}
                label={"Brand"}
                options={!loading && optionsBrands}
                getValue={(value) => {
                  setValue("brand", value, { shouldValidate: true });
                  // watchAndSetProgress("brand");
                }}
                loading={loading}
              />
              <FormError className={"h-auto!"} error={errors.brand?.message} />
            </div>
          </div>
          <div className="flex flex-row gap-10">
            <SelectableInput
              name={"categories"}
              label={"Main-Categories"}
              options={
                !isLoading("level1categories") && optionsLevel1Categories
              }
              getValue={(value) =>
                setValue("categories", value, { shouldValidate: true })
              }
              loading={isLoading("level1categories")}
            />
            <SelectableInput
              name={"subCategories"}
              label={"Sub-Categories"}
              options={
                !isLoading("level2categories") && optionsLevel2Categories
              }
              getValue={(value) =>
                setValue("subCategories", value, { shouldValidate: true })
              }
              loading={isLoading("level2categories")}
            />
            <SelectableInput
              name={"leafCategories"}
              label={"Leaf-Categories"}
              options={
                !isLoading("level3categories") && optionsLevel3Categories
              }
              getValue={(value) =>
                setValue("leafCategories", value, { shouldValidate: true })
              }
              loading={isLoading("level3categories")}
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
            <textarea
              id="message"
              name="shortDescription"
              rows="2"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write brief description about product in 200 ..."
              // maxLength={200}
              onChange={(e) =>
                setValue("shortDescription", e.target.value, {
                  shouldValidate: true,
                })
              }
            ></textarea>
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
                name="base_mrp"
                className="w-full"
                label="MRP"
                variant="outlined"
                // required={true}
                size="small"
                type={"number"}
                onChange={(e) =>
                  setValue("base_mrp", e.target.value, { shouldValidate: true })
                }
              />
              <FormError
                className={"h-auto!"}
                error={errors.base_mrp?.message}
              />
            </div>
            <div className="w-1/2">
              <TextField
                onChange={(e) =>
                  setValue("base_price", e.target.value, {
                    shouldValidate: true,
                  })
                }
                name="base_price"
                className="w-full"
                label="Selling Price (tax incl.)"
                variant="outlined"
                // required={true}
                size="small"
                type={"number"}
              />
              <FormError error={errors.base_price?.message} />
            </div>
            {/* <TextField
              disabled
              className="w-1/4"
              label="Discount in percentage (%)"
              value={discount > 0 ? `${discount}` : null}
              variant="outlined"
              required={true}
              size="small"
              type={"number"}
            /> */}
            {discount > 0 && (
              <div className="p-2 border w-1/3 rounded-sm">
                Discount : {discount}
              </div>
            )}
          </div>
          <button type="submit">click</button>
        </form>
      </Box>
    </>
  );
};

export default BasicProductInfo;
