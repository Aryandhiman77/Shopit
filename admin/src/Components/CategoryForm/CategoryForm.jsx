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
import Spinner from "../Reusables/Elements/Loader/Spinner";
import useData from "../hooks/useData";
import CustomToggle from "../Reusables/Elements/CustomToggle";
import FormError from "../Reusables/FormError";
import ImageDropBox from "../Reusables/ImageDropBox";
import { useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";

const CategoryForm = ({
  mode = "add",
  updationCategory = {},
  setEditModal,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    getValues,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(categoryValidationSchema) });

  const navigate = useNavigate();
  const {
    addCategory,
    isLoading,
    getCategoriesByLevel,
    level2Categories,
    level1Categories,
    updateCategory,
  } = useData();
  const categoryLevelStatus = watch("level");
  const [isActive, setIsActive] = useState(
    mode === "edit" ? updationCategory.isActive : false,
  );
  const [images, setImages] = useState([]);
  const [resetDropBox, setResetDropBox] = useState(false);
  const [attributes, setAttributes] = useState(
    updationCategory?.attributes || [],
  );
  const [isAddAttributeFormEnabled, setisAddAttributesFormEnabled] =
    useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  const setUpdateAttributeData = (i) => {
    setEditIndex(i);
    setisAddAttributesFormEnabled(true);
  };
  const deleteAttribute = (i) => {
    const filteredAttributes = attributes?.filter((_, index) => index !== i);
    setAttributes(filteredAttributes);
  };

  const resetFormStates = () => {
    reset();
    setIsActive(false);
    setAttributes([]);
    setEditIndex(-1);
    setResetDropBox(true);
    setImages([]);
  };
  const handleUpdateCategory = async (data) => {
    console.log("update", data);
    const update = await updateCategory(data);
    if (update) {
      resetFormStates();
      setEditModal(false);
    }
  };
  const onSubmit = async (data) => {
    if (mode === "edit") {
      const updationId = updationCategory._id;
      let details = { ...data, id: updationId };
      if (images.length > 0) {
        details = { ...details, image: images[0] };
      }
      let stringifiedAtts = JSON.stringify(attributes);
      if (attributes.length > 0) {
        details = { ...details, attributes: stringifiedAtts };
      }
      handleUpdateCategory(details);
      return;
    }
    if (images.length === 0) {
      return toast.error("Image is required.");
    }
    let details = { ...data, image: images[0] };
    if (attributes.length > 0) {
      const stringifiedAtt = JSON.stringify(attributes);
      details = { ...details, attributes: stringifiedAtt };
    }
    if (await addCategory(details)) {
      resetFormStates();
      navigate("/categories");
    }
  };
  let options =
    updateCategory?.level === 3 ? level2Categories : level1Categories;
  options = options.map((opt) => ({ label: opt.name, value: opt._id }));

  // const value = options.filter((item) => updateCategory._id === item._id);
  useEffect(() => {
    if (mode !== "edit" && updationCategory.level > 1) return;
    (async () => {
      if (updationCategory?.level === 2) {
        await getCategoriesByLevel(1);
      } else if (updationCategory?.level === 3) {
        await getCategoriesByLevel(2);
      }
      setValue("level", updationCategory.level);
      setValue("name", updationCategory.name);
      setValue("description", updationCategory.description);
      setIsActive(updationCategory.isActive);
      setAttributes(updationCategory.attributes || []);
      return;
    })();
  }, [mode]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full "
        >
          <>
            <div className="flex items-center gap-4 w-full">
              <>
                <TextField
                  select
                  className="w-full bg-white"
                  {...register("level")}
                  name="level"
                  label="Select Level"
                  defaultValue={
                    updationCategory?.level ? updationCategory.level : 1
                  }
                  variant="outlined"
                  required
                  onChange={(e) => {
                    setValue("level", e.target.value);
                    if (e.target.value === 2 && !level1Categories.length) {
                      getCategoriesByLevel(1);
                    } else if (
                      e.target.value === 3 &&
                      !level2Categories.length
                    ) {
                      getCategoriesByLevel(2);
                    }
                  }}
                  size="small"
                >
                  <MenuItem key={1} value={1}>
                    Main-Category
                  </MenuItem>
                  <MenuItem key={2} value={2}>
                    Sub-Category
                  </MenuItem>
                  <MenuItem key={3} value={3}>
                    Leaf-Category
                  </MenuItem>
                </TextField>
                <FormError error={errors.level?.message} />
              </>
              {categoryLevelStatus > 1 && (
                <>
                  <Controller
                    name="parent"
                    control={control}
                    defaultValue={updationCategory?.parentCategory || ""}
                    render={({ field }) => (
                      <Autocomplete
                        options={options}
                        value={
                          options.find((opt) => opt.value === field.value) ||
                          null
                        }
                        onChange={(_, val) =>
                          field.onChange(val ? val.value : "")
                        }
                        isOptionEqualToValue={(opt, val) =>
                          opt.value === val.value
                        }
                        getOptionLabel={(option) => option?.label ?? ""}
                        className="w-full"
                        renderInput={(params) => (
                          <TextField {...params} label="Select parent" />
                        )}
                      />
                    )}
                  />
                  <FormError error={errors.parent?.message} />
                </>
              )}
            </div>
            <>
              <TextField
                className="w-full bg-white"
                {...register("name")}
                name="name"
                defaultValue={mode === "edit" ? updationCategory.name : ""}
                label="Category Name"
                variant="outlined"
                required
                size="small"
              />
              <FormError error={errors.name?.message} />
            </>
          </>

          <>
            <TextField
              className="w-full bg-white"
              {...register("description")}
              defaultValue={mode === "edit" ? updationCategory.description : ""}
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
              initialImages={
                mode === "edit" ? [updationCategory?.image?.url] : []
              }
              setImages={setImages}
              maxFiles={1}
              resetDropBox={resetDropBox}
              setResetDropBox={setResetDropBox}
            />
          </div>

          <Box className={"bg-white rounded-sm!"}>
            <div className="flex justify-between items-center">
              <p className="text-gray-500 font-semibold text-xl">Attributes</p>
              <p className="text-gray-500 font-semibold text-sm">
                Attributes for category Products (optional)
              </p>
              <CustomButton
                type="button"
                onClick={() => setisAddAttributesFormEnabled(true)}
                bg={"#9ca1dc"}
                title={"+ Add Attribute"}
                fontSize={12}
              />
            </div>
            <Divider className="mb-5!" />

            {isAddAttributeFormEnabled ? (
              <CategoryAttributes
                attributes={attributes}
                setAttributes={setAttributes}
                setisAddAttributesFormEnabled={setisAddAttributesFormEnabled}
                editIndex={editIndex}
                setEditIndex={setEditIndex}
              />
            ) : attributes.length > 0 ? (
              <Table
                attributes={[
                  "S.no",
                  "Name",
                  "Input Value Type",
                  "Required",
                  "Options",
                  "Operations",
                ]}
              >
                {attributes.map((att, i) => (
                  <tr key={`att-${att.name}`} className="w-full border-b-1">
                    <td
                      type="text"
                      className="pl-9 px-4 py-4 whitespace-nowrap border-r-1"
                    >
                      {i + 1}.
                    </td>
                    <td
                      type="text"
                      className="px-6 py-4 whitespace-nowrap border-r-1 capitalize font-semibold"
                    >
                      {att.name}
                    </td>
                    <td
                      type="text"
                      className="px-6 py-4 whitespace-nowrap border-r-1 capitalize font-semibold"
                    >
                      {att.inputType === "string"
                        ? "text"
                        : att.inputType === "boolean"
                          ? "Yes/No"
                          : att.inputType}
                    </td>
                    <td
                      type="text"
                      className="px-6 py-4 whitespace-nowrap border-r-1"
                    >
                      {att.required ? "Yes" : "No (Recommended)"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-r-1 text-wrap">
                      {att.options?.length > 0 ? (
                        att.options.toString()
                      ) : (
                        <div className="text-center"> - </div>
                      )}
                    </td>
                    <td className="space-x-3 px-4 py-4 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => deleteAttribute(i)}
                        className="border border-red-600 p-2"
                      >
                        <FaTrashAlt color="red" size={25} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setUpdateAttributeData(i)}
                        className="border border-green-600 p-2"
                      >
                        <FaEdit color="green" size={25} />
                      </button>
                    </td>
                  </tr>
                ))}
              </Table>
            ) : (
              <div className="text-center text-gray-500 font-semibold">
                Add Attributes to see here.
              </div>
            )}
          </Box>

          <div className="mx-auto">
            <CustomButton
              title={mode === "edit" ? "Save Changes" : "AddCategory"}
              loading={isLoading(
                mode === "edit" ? "update-category" : "add-category",
              )}
              disabled={
                isLoading(
                  mode === "edit" ? "update-category" : "add-category",
                ) ||
                editIndex > -1 ||
                isAddAttributeFormEnabled
              }
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

// import React from 'react'

// const renderMenus = () => {
//   return (
//     <div>

//     </div>
//   )
// }
