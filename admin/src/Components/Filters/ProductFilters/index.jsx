import React, { useEffect, useState } from "react";
import FitlerSection from "../../Reusables/FilterSection";
import SelectableInput from "../../Reusables/SelectableInput";
import DatePickerMui from "../../Reusables/DatePickerMui";
import { Checkbox, TextField, Tooltip } from "@mui/material";
import useCategory from "../../hooks/useCategory";
import useBrands from "../../hooks/useBrands";
import buildQueryFromObject from "../../../utilities/buildQueryFromObject";
import { Controller, useForm } from "react-hook-form";

const ProductFilters = ({
  handleOnChange = () => {},
  handleFieldsReset = () => {},
}) => {
  const { control, reset } = useForm({
    defaultValues: {
      categories: [],
      brands: [],
      status: { label: "All", value: "" },
      featured: false,
      trending: false,
      sortBy: { label: "Newest", value: { sortOrder: "desc" } },
      createdAt: null,
      updatedAt: null,
    },
    mode: "onChange",
  });

  const resetFields = () => {
    reset();
    handleFieldsReset();
  };

  const {
    level1Categories,
    level2Categories,
    level3Categories,
    isLoading: isCategoriesLoading,
    getCategoriesByLevel,
  } = useCategory();
  const { getBrandsListing, brandListing: brands, loading } = useBrands();
  const categoryOptions = [
    ...(level1Categories || []),
    ...(level2Categories || []),
    ...(level3Categories || []),
  ]?.map((cat) => ({ label: cat.name, value: cat.slug }));

  const brandOptions = [...(brands || [])]?.map((brand) => ({
    label: brand.name,
    value: brand.slug,
  }));
  useEffect(() => {
    getBrandsListing();
    getCategoriesByLevel(1);
    getCategoriesByLevel(2);
    getCategoriesByLevel(3);
  }, []);

  return (
    <form>
      <FitlerSection
        className={"pt-5 "}
        handleOnChange={handleOnChange} // for search change
        onReset={resetFields}
      >
        <div className="flex items-center justify-between w-full flex-wrap">
          <SelectableInput
            control={control}
            className={"w-1/6!"}
            disableClearable={true}
            multiple={false}
            label={"Status"}
            name={"status"}
            required={false}
            options={[
              { label: "All", value: "" },
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
              { label: "Draft", value: "draft" },
            ]}
            getValue={(value) => {
              handleOnChange({ status: value.value });
            }}
          />
          <SelectableInput
            control={control}
            disableCloseOnSelect={false}
            className={"w-1/6!"}
            label={"Brands"}
            name={"brands"}
            multiple={true}
            required={false}
            options={loading ? [] : brandOptions}
            getValue={(values) =>
              handleOnChange({
                brands: values?.map((v) => v.value) || [],
              })
            }
          />
          <SelectableInput
            control={control}
            disableCloseOnSelect={true}
            className={"w-1/6!"}
            multiple={true}
            label={"Categories"}
            name={"categories"}
            required={false}
            loading={
              isCategoriesLoading("level1categories") ||
              isCategoriesLoading("level2categories") ||
              isCategoriesLoading("level3categories")
            }
            options={
              isCategoriesLoading("level1categories") ||
              isCategoriesLoading("level2categories") ||
              isCategoriesLoading("level3categories")
                ? []
                : categoryOptions
            }
            getValue={(values) =>
              handleOnChange({
                categories: values?.map((v) => v.value) || [],
              })
            }
          />
          <DatePickerMui
            control={control}
            className={"w-1/6!"}
            label={"Created Date"}
            name={"createdAt"}
            getValue={(value) => handleOnChange({ createdAt: value })}
          />
          <DatePickerMui
            control={control}
            className={"w-1/6!"}
            label={"Updated Date"}
            name={"updatedAt"}
            getValue={(value) => handleOnChange({ updatedAt: value })}
          />
        </div>
        <div className="flex items-center justify-between w-full flex-wrap">
          <Controller
            control={control}
            name="minPrice"
            render={({ field }) => (
              <TextField
                size="small"
                placeholder="min Price"
                className={"w-1/6!"}
                variant="outlined"
                label="Min. Price"
                type="number"
                onChange={(e) => {
                  handleOnChange({ minPrice: Number(e.target.value) });
                  field.onChange({ minPrice: Number(e.target.value) });
                }}
              />
            )}
          />
          <Controller
            control={control}
            name="maxPrice"
            render={({ field }) => (
              <TextField
                size="small"
                placeholder="max Price"
                className={"w-1/6!"}
                variant="outlined"
                label="Max. Price"
                type="number"
                onChange={(e) => {
                  handleOnChange({ maxPrice: Number(e.target.value) });
                  field.onChange({ minPrice: Number(e.target.value) });
                }}
              />
            )}
          />

          <SelectableInput
            control={control}
            className={"w-1/6!"}
            disableClearable={true}
            multiple={false}
            label={"Stock status"}
            name={"highlights"}
            defaultValue={{ label: "All", value: "" }}
            required={false}
            loading={loading}
            options={[
              { label: "All", value: "" },
              { label: "In stock", value: "in-stock" },
              { label: "Out of stock", value: "out-of-stock" },
              { label: "Low stock Alert", value: "low-stock" },
              { label: "Tracking disabled", value: "tracking-disabled" },
            ]}
            getValue={(value) => handleOnChange({ stock: value.value })}
          />
          <Controller
            name="featured"
            control={control}
            render={({ field }) => (
              <label
                htmlFor="featured"
                className="flex justify-center items-center font-medium"
              >
                Featured
                <Checkbox
                  value={field.value}
                  title="Featured"
                  id="featured"
                  onChange={(e) =>
                    handleOnChange({ featured: e.target.checked })
                  }
                />
              </label>
            )}
          />
          <Controller
            name="trending"
            control={control}
            render={({ field }) => (
              <label
                htmlFor="trending"
                className="flex justify-center items-center font-medium"
              >
                Trending
                <Checkbox
                  value={field.value}
                  title="Trending"
                  id="trending"
                  onChange={(e) =>
                    handleOnChange({ trending: e.target.checked })
                  }
                />
              </label>
            )}
          />
          <SelectableInput
            control={control}
            className={"w-1/6!"}
            disableClearable={true}
            multiple={false}
            label={"Sort By"}
            name={"sortBy"}
            required={false}
            options={[
              { label: "Newest", value: { sortOrder: "desc" } },
              { label: "Oldest", value: { sortOrder: "asc" } },
              {
                label: "Price: Low to High",
                value: { sortBy: "price", sortOrder: "asc" },
              },
              {
                label: "Price: High to Low",
                value: { sortBy: "price", sortOrder: "desc" },
              },
              {
                label: "Stock: Low to High",
                value: { sortBy: "stock", sortOrder: "asc" },
              },
              {
                label: "Stock: High to Low",
                value: { sortBy: "stock", sortOrder: "desc" },
              },
              {
                label: "Name: A to Z",
                value: { sortBy: "title", sortOrder: "asc" },
              },
              {
                label: "Name: Z to A",
                value: { sortBy: "title", sortOrder: "desc" },
              },
            ]}
            getValue={(value) => {
              handleOnChange({ ...value.value });
            }}
          />
        </div>
      </FitlerSection>
    </form>
  );
};

export default ProductFilters;
