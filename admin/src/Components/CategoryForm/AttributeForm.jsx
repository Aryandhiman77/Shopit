import React, { useEffect, useState } from "react";
import CustomButton from "../Reusables/Elements/CustomBtn";
import Box from "../Reusables/Elements/Box";
import { Divider, MenuItem, TextField } from "@mui/material";
import { BsPlus, BsTrash } from "react-icons/bs";
import { _normalizeConversionConsumables } from "ckeditor5";
import attributesSchema from "./attributesValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import FormError from "../Reusables/FormError";

const AttributeForm = ({
  attributes,
  setAttributes,
  setisAddAttributesFormEnabled,
  editIndex,
  setEditIndex,
}) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm({ resolver: yupResolver(attributesSchema) });

  const [attribute, setAttribute] = useState({
    name: editIndex > -1 ? attributes[editIndex]?.name : "",
    inputType: editIndex > -1 ? attributes[editIndex]?.inputType : "string",
    required: editIndex > -1 ? attributes[editIndex]?.required : false,
  });
  const [options, setOptions] = useState(
    editIndex > -1 && attributes[editIndex]?.options?.length > 0
      ? attributes[editIndex]?.options
      : [],
  );
  const [optionInput, setOptionInput] = useState("");

  const addOptions = () => {
    setOptions([...options, optionInput]);
    console.log(options);
    if (optionInput.length > 0) {
      setOptionInput("");
    }
  };
  const removeOption = (index) => {
    setOptions(options.filter((item, i) => i !== index));
  };

  const changeInputOptions = (event) => {
    setOptionInput(event.target.value);
  };
  const updateAddedOption = (event, i) => {
    let updatedOptions = [...options];
    updatedOptions[i] = event.target?.value;
    setOptions([...updatedOptions]);
  };

  const changeSelection = (event) => {
    setAttribute({ ...attribute, [event.target?.name]: event.target.value });
  };
  const resetAttributesFormStates = () => {
    setAttribute({ name: "", inputType: "string", required: false });
    setOptions([]);
    setOptionInput("");
    setisAddAttributesFormEnabled(false);
    if (editIndex > -1) {
      setEditIndex(-1);
    }
    reset();
  };

  const onSubmit = (data) => {
    let attributeData = data;
    if (attribute.inputType === "select" && optionInput.length > 0) {
      return toast.error("Please add the option.");
    }
    if (attribute.inputType === "select" && options.length === 0) {
      return toast.error("Please make atleast option");
    }
    if (attribute.inputType !== "select") {
      setOptions([]);
      attributeData = data;
    } else if (options.length > 0) {
      attributeData = { ...data, options };
    }
    if (editIndex > -1) {
      let updatedAttributeData = attributes;
      updatedAttributeData[editIndex] = attributeData;
      setAttributes(updatedAttributeData);
      setEditIndex(-1);
    } else {
      setAttributes([...attributes, attributeData]);
    }
    resetAttributesFormStates();
  };

  return (
    <div>
      <div className="flex flex-col gap-3">
        <>
          <div className="w-full flex items-center gap-2 transition-all duration-200 ease-in-out">
            <div className="flex flex-col w-full">
              <TextField
                {...register("name")}
                name="name"
                defaultValue={attribute?.name}
                className="w-full"
                label="Attribute Name (ex.color)"
                variant="outlined"
              />
              <FormError error={errors.name?.message} className={"h-5"} />
            </div>
            <div className="flex flex-col w-full">
              <TextField
                {...register("inputType")}
                name="inputType"
                className="w-full"
                select
                value={attribute?.inputType}
                label="Value Type"
                variant="outlined"
                onChange={changeSelection}
              >
                <MenuItem value={"string"}>Text</MenuItem>
                <MenuItem value={"boolean"}>YES/NO</MenuItem>
                <MenuItem value={"select"}>Options</MenuItem>
              </TextField>

              <FormError error={errors.inputType?.message} className={"h-5"} />
            </div>
            <div className="flex flex-col w-full">
              <TextField
                {...register("required")}
                className="w-full"
                select
                value={attribute?.required}
                onChange={changeSelection}
                label="Is required for Products ?"
                variant="outlined"
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No (recommended)</MenuItem>
              </TextField>
              <FormError error={errors.required?.message} className={"h-5"} />
            </div>
          </div>
          {attribute?.inputType === "select" && (
            <div className="w-full flex flex-col items-center gap-1">
              <div className="flex flex-row w-full gap-3">
                <TextField
                  className="w-full"
                  name="options"
                  label="Add Options"
                  variant="outlined"
                  value={optionInput}
                  onChange={changeInputOptions}
                />
                <button
                  onClick={addOptions}
                  disabled={optionInput.length === 0}
                  type="button"
                  className={`custom-btn bg-black! rounded-md disabled:opacity-30`}
                >
                  <BsPlus size={35} color="white" />
                </button>
              </div>
              <div className="flex flex-col w-full gap-3 mt-2">
                {options?.map((_, i) => (
                  <div
                    key={`option-${i}`}
                    className="flex flex-row w-full gap-3 items-center"
                  >
                    <TextField
                      className="w-full "
                      label={`Add Option-${i + 1}`}
                      value={options[i]}
                      onChange={(event) => updateAddedOption(event, i)}
                      variant="outlined"
                    />
                    <button
                      onClick={() => removeOption(i)}
                      type="button"
                      className={`custom-btn bg-black! rounded-md disabled:opacity-30`}
                    >
                      <BsTrash size={35} color="white" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex justify-between">
            <button
              className="p-2 bg-[#2dba38]! text-white! custom-btn"
              onClick={handleSubmit(onSubmit)}
              type="button"
            >
              Save Attribute
            </button>
            <button
              onClick={resetAttributesFormStates}
              className="p-2 bg-red-600! text-white! custom-btn"
              type="button"
            >
              Cancel
            </button>
          </div>
        </>
      </div>
    </div>
  );
};

export default AttributeForm;
