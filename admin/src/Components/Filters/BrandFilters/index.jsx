import React, { useEffect } from "react";
import useCategory from "../../hooks/useCategory";
import { useForm } from "react-hook-form";
import Search from "../../Reusables/Search";
import { Tooltip } from "@mui/material";
import { RiResetLeftFill } from "react-icons/ri";
import SelectableInput from "../../Reusables/SelectableInput";
import Box from "../../Reusables/Elements/Box";

const BrandFilters = ({ handleOnChange, onReset = () => {} }) => {
  const { control, reset } = useForm({
    defaultValues: {
      sortBy: { label: "Newest", value: { sortOrder: "desc" } },
      status: { label: "All", value: "" },
    },
  });
  const {
    level1Categories,
    level2Categories,
    level3Categories,
    isLoading: isCategoriesLoading,
    getCategoriesByLevel,
  } = useCategory();
  const categoryOptions = [
    ...(level1Categories || []),
    ...(level2Categories || []),
    ...(level3Categories || []),
  ]?.map((cat) => ({ label: cat.name, value: cat.slug }));

  const handleReset = () => {
    reset();
    onReset();
  };

  useEffect(() => {
    getCategoriesByLevel(1);
    getCategoriesByLevel(2);
    getCategoriesByLevel(3);
  }, []);
  return (
    <div>
      <Box className="flex gap-5  w-[80vw] max-w-[90vw] bg-white">
        <div className="w-full">
          <Search
            placeholder={"Search Brands ..."}
            onSearch={(search) => {
              handleOnChange({ search, page: 1 });
            }}
          />
        </div>
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
          ]}
          getValue={(value) => {
            handleOnChange({ status: value.value });
          }}
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
              label: "Name: A to Z",
              value: { sortBy: "name", sortOrder: "asc" },
            },
            {
              label: "Name: Z to A",
              value: { sortBy: "name", sortOrder: "desc" },
            },
          ]}
          getValue={(value) => {
            handleOnChange({ ...value.value });
          }}
        />
        <div>
          <button
            type="reset"
            onClick={handleReset}
            className={`custom-btn custom-border flex items-center gap-2 !bg-transparent text-black! text-sm font-[500] border! border-gray-400! rounded-md! hover:text-black!  px-4!`}
          >
            <Tooltip title="Clear all filters">
              <div className="flex gap-1 items-center">Reset</div>
            </Tooltip>
          </button>
        </div>
      </Box>
    </div>
  );
};

export default BrandFilters;
