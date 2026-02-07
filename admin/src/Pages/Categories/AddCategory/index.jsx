import React, { useEffect, useState } from "react";
import { Divider, FormControl, FormHelperText, TextField } from "@mui/material";
import ImageDropBox from "../../../Components/Reusables/ImageDropBox";
import BreadCrumb from "../../../Components/Reusables/Elements/BreadCrumb";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import categoryValidationSchema from "../validation";
import FormError from "../../../Components/Reusables/FormError";
import CustomToggle from "../../../Components/Reusables/Elements/CustomToggle";
import toast from "react-hot-toast";
import useData from "../../../Components/hooks/useData";
import CustomButton from "../../../Components/Reusables/Elements/CustomBtn";
import CategoryAttributes from "../AttributeForm";
import { useLocation, useParams } from "react-router-dom";
import Box from "../../../Components/Reusables/Elements/Box";
import Table from "../../../Components/Table";
import {
  BsEye,
  BsEyeFill,
  BsPencil,
  BsPlus,
  BsTrash,
  BsViewList,
} from "react-icons/bs";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import MenuItem from "@mui/material/MenuItem";
import Spinner from "../../../Components/Reusables/Elements/Loader/Spinner";
import js from "@eslint/js";

const AddCategory = () => {
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
  const {
    addCategory,
    isLoading,
    getCategoriesByLevel,
    level2Categories,
    level1Categories,
  } = useData();
  const [isActive, setIsActive] = useState(false);
  const [images, setImages] = useState([]);
  const [resetDropBox, setResetDropBox] = useState(false);
  const [attributes, setAttributes] = useState([]);
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

  const onSubmit = async (data) => {
    if (images.length === 0) {
      return toast.error("Image is required.");
    }
    let details = { ...data, image: images[0] };
    if (attributes.length > 0) {
      const strinfiedAtt = JSON.stringify(attributes);
      details = { ...details, attributes: strinfiedAtt };
    }
    if (await addCategory(details)) {
      reset();
      setIsActive(false);
      setAttributes([]);
      setResetDropBox(true);
      setImages([]);
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-[700] text-black">Add Category</h1>
        <BreadCrumb addBreadCrumb="Add Category" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 ">
        <>
          <div className="flex items-center gap-4">
            <>
              <TextField
                select
                className="w-full bg-white"
                {...register("level")}
                name="level"
                label="Select Level"
                defaultValue={1}
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
                <MenuItem value={1}>Main-Category</MenuItem>
                <MenuItem value={2}>Sub-Category</MenuItem>
                <MenuItem value={3}>Leaf-Category</MenuItem>
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
                  defaultValue={"none"}
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
            title={"Add Category"}
            loading={isLoading("add-category")}
            disabled={
              isLoading("add-category") ||
              editIndex > -1 ||
              isAddAttributeFormEnabled
            }
            type={"submit"}
            className={"rounded-0! bg-primary! w-70"}
          />
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
