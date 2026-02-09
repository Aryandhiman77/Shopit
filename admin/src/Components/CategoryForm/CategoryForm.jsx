import React, { useEffect, useState } from "react";
import { Divider, TextField } from "@mui/material";
import BreadCrumb from "../Reusables/Elements/BreadCrumb";
import { useForm } from "react-hook-form";
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
    formState: { errors },
  } = useForm({ resolver: yupResolver(categoryValidationSchema) });
  const categoryLevelStatus = watch("level");
  const navigate = useNavigate();
  const {
    addCategory,
    isLoading,
    getCategoriesByLevel,
    level2Categories,
    level1Categories,
    updateCategory,
  } = useData();
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
    setResetDropBox(true);
    setImages([]);
  };
  const handleUpdateCategory = async (data) => {
    console.log("update", data);
    // const update = await updateCategory(details);
    // if (update) {
    //   setEditModal(false);
    //   resetFormStates();
    // }
  };
  const onSubmit = async (data) => {
    if (mode === "edit") {
      let details = data;
      if (images.length > 0) {
        details = { ...details, image: images[0] };
      }
      if (attributes.length > 0) {
        const stringifiedAtt = JSON.stringify(attributes);
        details = { ...details, attributes: stringifiedAtt };
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
      navigate("/categories");
    }
  };
  useEffect(() => {
    if (updationCategory.level === 2) {
      getCategoriesByLevel(1);
    } else if (updationCategory.level === 3) {
      getCategoriesByLevel(2);
      console.log(updateCategory);
    }
  }, []);
  return (
    <>
      <div className="flex flex-col gap-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 "
        >
          <>
            <div className="flex items-center gap-4">
              <>
                <TextField
                  select
                  className="w-full bg-white"
                  {...register("level")}
                  name="level"
                  label="Select Level"
                  // defaultValue={mode === "edit" ? updationCategory?.level : 1}
                  variant="outlined"
                  required
                  onChange={(e) => {
                    setValue("level", e.target.value);
                    if (level1Categories.length && level2Categories.length) {
                      return;
                    }
                    if (e.target.value === 2) {
                      getCategoriesByLevel(1);
                    } else if (e.target.value === 3) {
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
                  <TextField
                    select
                    className="w-full bg-white capitalize"
                    {...register("parent")}
                    name="parent"
                    label="Select Parent Category"
                    variant="outlined"
                    // defaultValue={
                    //   mode === "edit" ? updationCategory.parentCategory : "none"
                    // }
                    required
                    size="small"
                  >
                    <MenuItem value={"none"}>None</MenuItem>
                    {isLoading(
                      `level${categoryLevelStatus === 2 ? 1 : 2}categories`,
                    ) ? (
                      <div className="flex justify-center items-center h-20">
                        <Spinner size={30} />
                      </div>
                    ) : categoryLevelStatus === 3 ? (
                      level2Categories?.map((item) => (
                        <MenuItem className="capitalize" value={item?._id}>
                          {item.name}
                        </MenuItem>
                      ))
                    ) : (
                      categoryLevelStatus === 2 &&
                      level1Categories?.map((item) => (
                        <MenuItem className="capitalize" value={item?._id}>
                          {item?.name}
                        </MenuItem>
                      ))
                    )}
                  </TextField>
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
                mode === "edit" ? [updationCategory?.image.url] : []
              }
              setImages={setImages}
              maxFiles={1}
              resetDropBox={resetDropBox}
              setResetDropBox={setResetDropBox}
            />
          </div>
          <div className="flex gap-2 items-center">
            <CustomToggle
              checked={isActive}
              onChange={(val) => {
                setIsActive(val);
                setValue("isActive", val);
              }}
            />
            {isActive ? (
              <span className="text-green-600">Active</span>
            ) : (
              <span className="text-red-600">Inactive</span>
            )}
            <FormError error={errors.isActive?.message} />
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
