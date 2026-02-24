import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../Components/Reusables/Elements/BreadCrumb";
import { TextField } from "@mui/material";
import DropDownField from "../../../Components/Reusables/DropDownField";
import TinyEditor from "../../../Components/Reusables/TinyEditor";
import ImageDropBox from "../../../Components/Reusables/ImageDropBox";
import CustomToggle from "../../../Components/Reusables/Elements/CustomToggle";
import Box from "../../../Components/Reusables/Elements/Box";
import { Link } from "react-router-dom";
import SelectableInput from "../../../Components/Reusables/SelectableInput";
import useCategory from "../../../Components/hooks/useCategory";
import CustomStepper from "../../../Components/Reusables/Stepper";
import BasicProductInfo from "./Steps/BasicProductInfo";
import Description from "./Steps/Description";
import Images from "./Steps/Images";
import AddTags from "./Steps/AddTags";
import Inventory from "./Steps/Inventory";
import toast from "react-hot-toast";
const steps = [
  {
    label: "Basic Info",
    progress: 0,
    component: <BasicProductInfo />,
  },
  {
    label: "Description",
    progress: 0,
    component: <Description />,
  },
  {
    label: "Images",
    progress: 0,
    component: <Images />,
  },
  {
    label: "Inventory",
    progress: 0,
    component: <Inventory />,
  },
  {
    label: "Tags",
    progress: 0,
    component: <AddTags />,
  },
  {
    label: "Published",
    progress: 0,
    component: "publishing product....",
  },
];
const AddProduct = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [productData, setProductData] = useState({});
  const nextStep = () => {
    if (steps.length > currentStep && steps[currentStep - 1].progress === 100) {
      setCurrentStep((prev) => prev + 1);
    }
  };
  const gotoPrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // useEffect(() => {
  //   steps[currentStep - 1].progress = currentProgress;
  // }, [currentProgress]);

  useEffect(() => {
    if (currentProgress === 100) {
      setCurrentProgress(0);
    }
  }, [currentStep]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <BreadCrumb />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium text-gray-600">Add Product</h1>
        <div>
          <p className="text- font-medium text-gray-600">
            Status :{" "}
            <span
              className={`p-2 bg-yellow-300 border border-yellow-500 text-black rounded-sm`}
            >
              Draft
            </span>
          </p>
        </div>
      </div>
      <div className="py-7">
        <CustomStepper steps={steps} activeStep={currentStep} />
      </div>
      {/* <form action=""> */}
      <div className="flex flex-col gap-4 h-[85vh]">
        {/* {steps[currentStep - 1].component} */}
        {currentStep === 1 && (
          <BasicProductInfo
            setCurrentProgress={setCurrentProgress}
            setProductData={setProductData}
            productData={productData}
            createProductHandler={nextStep}
            // getProgress={(value) => (steps[currentStep - 1].progress = value)}
          />
        )}
        {currentStep === 2 && <Description />}
        {currentStep === 3 && <Images />}
        {currentStep === 4 && <Inventory />}
        {currentStep === 5 && <AddTags />}
        {/* <div className="flex flex-row gap-10 items-center my-4">
            <Box className={"bg-white"}>
              <h1 className="heading-1 py-2">Product settings</h1>
              <div className="flex my-4 gap-2 justify-between ">
                <p className="font-[500]"> In Stock ?</p>
                <CustomToggle />
              </div>
              <div className="flex my-4 gap-2 justify-between ">
                <p className="font-[500]"> Is Featured ?</p>
                <CustomToggle />
              </div>
              <div className="flex my-4 gap-2 justify-between">
                <p className="font-[500]"> Is Trending ?</p>
                <CustomToggle defaultChecked={true} />
              </div>
            </Box>
          </div> */}
        {/* <Box className={"flex  items-center gap-10  bg-white"}>
            <div className="flex my-4 gap-2 ">
              <p className="font-[500]"> Free Shipping ?</p>
              <CustomToggle />
            </div>
            <TextField
              className="w-1/2"
              label="Shipping Amount"
              variant="outlined"
              required={true}
              size="small"
              type={"number"}
            />
          </Box> */}
        {/* <Box className={"flex  items-center gap-10  bg-white"}>
                <h1 className="heading-1">Search Engine Optimization</h1>    ONLY SHOWN IN EDITING
                  <TextField
                  className="w-1/2"
                  label="Product Slug"
                  variant="outlined"
                  required={true}
                  size="small"
                  type={"number"}
                />
            </Box> */}

        {/* <Box className={"bg-white flex flex-col gap-4"}>
            <div className="flex items-center justify-between">
              <h1 className="heading-1">Product Variant</h1>
              <Link className="custom-btn !bg-blue-500 !text-white !font-[500] text-sm flex items-center gap-1">
                <PiPlusBold />
                Create Variant
              </Link>
            </div>
            <div className="flex flex-row gap-10">
              <TextField
                className="w-1/2"
                label="Name"
                variant="outlined"
                required={true}
                size="small"
                type={"text"}
              />
              <TextField
                className="w-1/2"
                label="SKU"
                variant="outlined"
                required={true}
                size="small"
                type={"text"}
              />
            </div>
            <div className="flex flex-row gap-10">
              <TextField
                className="w-1/2"
                label="MRP"
                variant="outlined"
                required={true}
                size="small"
                type={"number"}
              />
              <TextField
                className="w-1/2"
                label="Discount"
                variant="outlined"
                required={true}
                size="small"
                type={"number"}
              />
              <TextField
                className="w-1/2"
                label="Sale Price"
                variant="outlined"
                required={true}
                size="small"
                type={"number"}
              />
            </div>
            <div className="w-full">
              <h3 className="px-1 py-3 text-sm font-[500]">Thumbnail</h3>
              <ImageDropBox maxFiles={1} setImages={setThumbnail} />
              <h3 className="px-1 py-3 text-sm font-[500]">Variant Gallery</h3>
              <ImageDropBox maxFiles={10} setImages={setGallery} />
            </div>
            <div>
              <h1 className="heading-1 py-4">Inventory Tracking</h1>
              <div className="pb-4 flex flex-col gap-2">
                <div className="flex ">
                  <div className="flex items-center h-5">
                    <input
                      id="inventory-3"
                      aria-describedby="helper-radio-text"
                      name="variant-inventory"
                      type="radio"
                      value=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div className="ms-2 text-sm">
                    <label
                      htmlFor="inventory-3"
                      className="font-medium text-gray-900 dark:text-gray-300"
                    >
                      Track inventory for this product.
                    </label>
                    <p
                      id="helper-radio-text"
                      className="text-xs font-normal text-gray-500 dark:text-gray-300"
                    >
                      Stock will be limited.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex items-center h-5">
                    <input
                      id="inventory-4"
                      name="variant-inventory"
                      aria-describedby="helper-radio-text"
                      type="radio"
                      value=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div className="ms-2 text-sm">
                    <label
                      htmlFor="inventory-4"
                      className="font-medium text-gray-900 dark:text-gray-300"
                    >
                      Do not track inventory for this product.
                    </label>
                    <p
                      id="helper-radio-text"
                      className="text-xs font-normal text-gray-500 dark:text-gray-300"
                    >
                      Stock will be unlimited.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 w-1/2">
                <TextField
                  className="w-full"
                  label="Current Stock Level"
                  variant="outlined"
                  required={true}
                  size="small"
                  type={"number"}
                />
                <TextField
                  className="w-full"
                  label="Low Stock Alert"
                  variant="outlined"
                  required={true}
                  size="small"
                  type={"number"}
                />
              </div>
            </div>
            <div>
              <h1 className="heading-1 pt-4 pb-2">Variant Attributes</h1>
              <div className="flex gap-10">
                <label className="flex items-center gap-2">
                  <p className="font-[500]">Color</p>
                  <input
                    type="color"
                    defaultValue={"#f52525"}
                    className="rounded-full h-10 w-10"
                  />
                </label>
                <label htmlFor="size" className="flex items-center gap-2 w-1/2">
                  <p className="font-[500]">Size</p>
                  <DropDownField
                    title={"Size"}
                    items={["Small", "Medium", "Large", "XL", "XXL"]}
                  />
                </label>
              </div>
            </div>
          </Box> */}
        <div className="fixed bottom-0 right-0 bg-[#e6e6e6] w-[100%] border-t-1 border-t-[#d5d5d5] z-98">
          <div className="flex gap-3 justify-end p-4 rounded-sm">
            {/* <Link className="custom-btn bg-transparent! border border-gray-400! !font-[500] text-sm">
                Save Draft
              </Link> */}
            <button
              // type="submit"
              disabled={currentStep === 1}
              onClick={gotoPrevious}
              className="custom-btn !bg-blue-500 !text-white !font-[500] text-sm disabled:opacity-50"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={nextStep}
              className="custom-btn !bg-blue-500 !text-white !font-[500] text-sm"
            >
              Create Product
            </button>
          </div>
        </div>
      </div>
      {/* </form> */}
    </div>
  );
};

export default AddProduct;
