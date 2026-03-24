import React, { useEffect, useState } from "react";
import FitlerSection from "../../Reusables/FilterSection";
import SelectableInput from "../../Reusables/SelectableInput";
import DatePickerMui from "../../Reusables/DatePickerMui";
import { Checkbox, TextField, Tooltip } from "@mui/material";
import useCategory from "../../hooks/useCategory";
import useBrands from "../../hooks/useBrands";
import buildQueryFromObject from "../../../utilities/buildQueryFromObject";
import Search from "../../Reusables/Search";
import { CiFilter } from "react-icons/ci";
import CustomButton from "../../Reusables/Elements/CustomBtn";
import { IoMdRefresh } from "react-icons/io";

const ProductFilters = ({
  filters = {},
  setFilters = () => {},
  handleOnChange = () => {},
}) => {
  // categories,✅
  // search,✅
  // brands,✅
  // created_at,✅
  // updated_at,✅
  // status,✅
  // stock,✅
  // minPrice,✅
  // maxPrice,✅
  // featured,✅
  // trending,✅
  // sortOrder+sortby - asc,desc, price="asc"✅

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
  useEffect(() => {
    const query = buildQueryFromObject(filters);
    console.log(query);
  }, [filters]);
  return (
    <>
      <FitlerSection className={"pt-5 "}>
        <div className="flex items-center justify-between w-full flex-wrap">
          <SelectableInput
            className={"w-1/6!"}
            disableClearable={true}
            multiple={false}
            label={"Status"}
            name={"status"}
            defaultValue={{ label: "All", value: "" }}
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
            className={"w-1/6!"}
            label={"Created Date"}
            name={"createdAt"}
            getValue={(value) => handleOnChange({ createdAt: value })}
          />
          <DatePickerMui
            className={"w-1/6!"}
            label={"Updated Date"}
            name={"updatedAt"}
            getValue={(value) => handleOnChange({ updatedAt: value })}
          />
        </div>
        <div className="flex items-center justify-between w-full flex-wrap">
          <TextField
            size="small"
            placeholder="min Price"
            className={"w-1/6!"}
            variant="outlined"
            name="minPrice"
            label="Min. Price"
            type="number"
            onChange={(e) =>
              handleOnChange({ minPrice: Number(e.target.value) })
            }
          />
          <TextField
            size="small"
            placeholder="max Price"
            className={"w-1/6!"}
            variant="outlined"
            name="maxPrice"
            label="Max. Price"
            type="number"
            onChange={(e) =>
              handleOnChange({ maxPrice: Number(e.target.value) })
            }
          />
          <SelectableInput
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
          {/* <SelectableInput
          disableClearable={true}
          multiple={false}
          label={"Product Highlights"}
          name={"highlights"}
          defaultValue={{ label: "Both", value: "" }}
          required={false}
          loading={loading}
          options={[
            { label: "Both", value: "" },
            { label: "Featured", value: "featured=true" },
            { label: "Trending", value: "trending=true" },
          ]}
          getValue={(value) => handleOnChange({ highlights: value.value })}
        /> */}
          <label
            htmlFor="featured"
            className="flex justify-center items-center font-medium"
          >
            Featured
            <Checkbox
              title="Featured"
              id="featured"
              onChange={(_, value) => handleOnChange({ featured: value })}
            />
          </label>
          <label
            htmlFor="trending"
            className="flex justify-center items-center font-medium"
          >
            Trending
            <Checkbox
              title="Trending"
              id="trending"
              onChange={(_, value) => handleOnChange({ trending: value })}
            />
          </label>

          <SelectableInput
            className={"w-1/6!"}
            disableClearable={true}
            multiple={false}
            label={"Sort By"}
            name={"sortBy"}
            defaultValue={{ label: "Newest", value: "sortOrder=desc" }}
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
    </>
  );
};

export default ProductFilters;
