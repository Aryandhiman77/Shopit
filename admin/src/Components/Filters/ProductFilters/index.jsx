import React from "react";
import FitlerSection from "../../Reusables/FilterSection";
import SelectableInput from "../../Reusables/SelectableInput";
import DatePickerMui from "../../Reusables/DatePickerMui";
import { TextField } from "@mui/material";

const ProductFilters = () => {
  // categories,✅
  // search,✅
  // brands,✅
  // created_at,✅
  // updated_at,✅
  // status,✅
  // stock,
  // minPrice,✅
  // maxPrice,✅
  // featured,
  // trending,
  // sortOrder - asc,desc,
  // sortby- price

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
        />
        <SelectableInput
          disableClearable={true}
          multiple={false}
          label={"Brands"}
          name={"brands"}
          defaultValue={{ label: "All", value: "" }}
          required={false}
          options={[
            { label: "All", value: "" },
            { label: "Active", value: "isActive=true" },
            { label: "Inactive", value: "isActive=false" },
            { label: "Draft", value: "status=draft" },
          ]}
        />
        <SelectableInput
          multiple={true}
          disableClearable={true}
          label={"Categories"}
          name={"categories"}
          defaultValue={[{ label: "All", value: "" }]}
          required={false}
          options={[
            { label: "All", value: "" },
            { label: "Active", value: "isActive=true" },
            { label: "Inactive", value: "isActive=false" },
            { label: "Draft", value: "status=draft" },
          ]}
        />
        <DatePickerMui label={"Created At"} />
        <DatePickerMui label={"Updated At"} />
      </div>
      <div className="flex items-center gap-4 w-full">
        <TextField
          size="small"
          placeholder="min Price"
          className="w-full"
          variant="outlined"
          name="minPrice"
          label="Min. Price"
        />
        <TextField
          size="small"
          placeholder="max Price"
          className="w-full"
          variant="outlined"
          name="maxPrice"
          label="Max. Price"
        />
        <SelectableInput
          disableClearable={true}
          multiple={false}
          label={"Product Highlights"}
          name={"highlights"}
          defaultValue={{ label: "Both", value: "" }}
          required={false}
          options={[
            { label: "Both", value: "" },
            { label: "Featured", value: "featured=true" },
            { label: "trending", value: "trending=true" },
          ]}
        />
        <SelectableInput
          disableClearable={true}
          multiple={false}
          label={"Sort Order"}
          name={"sortOrder"}
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
