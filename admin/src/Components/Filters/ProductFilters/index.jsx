import React, { useEffect, useState } from "react";
import FitlerSection from "../../Reusables/FilterSection";
import SelectableInput from "../../Reusables/SelectableInput";
import DatePickerMui from "../../Reusables/DatePickerMui";
import { TextField } from "@mui/material";
import useCategory from "../../hooks/useCategory";
import useBrands from "../../hooks/useBrands";

const ProductFilters = () => {
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
  // sortOrder - asc,desc,✅
  const { filters, setFilters } = useState({});
  const handleOnChange = (value) => {
    // setFilters(...filters, value);
    console.log(value);
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
  useEffect(() => {
    console.log(filters);
  }, [filters]);
  return (
    <FitlerSection className={"pt-5"}>
      <div className="flex items-center gap-4 w-full">
        <SelectableInput
          disableClearable={true}
          multiple={false}
          label={"Status"}
          name={"status"}
          defaultValue={{ label: "All", value: "" }}
          required={false}
          options={[
            { label: "All", value: "" },
            { label: "Active", value: "isActive=true" },
            { label: "Inactive", value: "isActive=false" },
            { label: "Draft", value: "status=draft" },
          ]}
          getValue={(value) => {
            handleOnChange({ status: value.value });
          }}
        />
        <SelectableInput
          label={"Brands"}
          name={"brands"}
          multiple={true}
          required={false}
          options={brandOptions}
          getValue={(values) =>
            handleOnChange({ brands: [...(values.map((v) => v.value) || [])] })
          }
        />
        <SelectableInput
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
            !isCategoriesLoading("level1categories") &&
            !isCategoriesLoading("level2categories") &&
            !isCategoriesLoading("level3categories") &&
            categoryOptions
          }
          getValue={(values) =>
            handleOnChange({
              categories: [...(values.map((v) => v.value) || [])],
            })
          }
        />
        <DatePickerMui
          label={"Created Date"}
          name={"createdAt"}
          getValue={(value) => handleOnChange({ createdAt: value })}
        />
        <DatePickerMui
          label={"Updated Date"}
          name={"updatedAt"}
          getValue={(value) => handleOnChange({ updatedAt: value })}
        />
      </div>
      <div className="flex items-center gap-4 w-full">
        <TextField
          size="small"
          placeholder="min Price"
          className="w-full"
          variant="outlined"
          name="minPrice"
          label="Min. Price"
          type="number"
          onChange={(e) =>
            handleOnChange({ minPrice: `minPrice=${e.target.value}` })
          }
        />
        <TextField
          size="small"
          placeholder="max Price"
          className="w-full"
          variant="outlined"
          name="maxPrice"
          label="Max. Price"
          type="number"
          onChange={(e) =>
            handleOnChange({ maxPrice: `minPrice=${e.target.value}` })
          }
        />
        <SelectableInput
          disableClearable={true}
          multiple={false}
          label={"Stock status"}
          name={"highlights"}
          defaultValue={{ label: "All", value: "" }}
          required={false}
          loading={loading}
          options={[
            { label: "All", value: "" },
            { label: "In stock", value: "stock=in-stock" },
            { label: "Out of stock", value: "stock=out-of-stock" },
            { label: "Low stock Alert", value: "stock=low-stock" },
            { label: "Tracking disabled", value: "stock=tracking-disabled" },
          ]}
          getValue={(value) => handleOnChange({ stock: value.value })}
        />
        <SelectableInput
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
        />

        <SelectableInput
          disableClearable={true}
          multiple={false}
          label={"Sort By"}
          name={"sortBy"}
          defaultValue={{ label: "Newest", value: "sortOrder=desc" }}
          required={false}
          options={[
            { label: "Newest", value: "sortOrder=desc" },
            { label: "Oldest", value: "sortOrder=asc" },
            { label: "Price Low to High", value: "sortBy=price&sortOrder=asc" },
            {
              label: "Price High to Low",
              value: "sortBy=price&sortOrder=desc",
            },
            {
              label: "Stock Low to High",
              value: "sortby=stock&sortOrder=asc",
            },
            {
              label: "Stock High to Low",
              value: "sortby=stock&sortOrder=desc",
            },
            { label: "Name A to Z", value: "sortby=title&sortOrder=asc" },
            { label: "Name Z to A", value: "sortby=title&sortOrder=desc" },
          ]}
        />
      </div>
    </FitlerSection>
  );
};

export default ProductFilters;
