import { useEffect, useInsertionEffect, useMemo, useState } from "react";
import BreadCrumb from "../../../Components/Reusables/Elements/BreadCrumb";
import CustomStepper from "../../../Components/Reusables/Stepper";
import BasicProductInfo from "./Steps/BasicProductInfo";
import Description from "./Steps/Description";
import Images from "./Steps/Images";
import AddTags from "./Steps/AddTags";
import Inventory from "./Steps/Inventory";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { basicProductInfo, imagesSchema, tagsValidations } from "./validation";

import useProducts from "../../../Components/hooks/useProducts";
import CustomBtn from "../../../Components/Reusables/Elements/CustomBtn";

import BackendErrors from "../../../Components/Reusables/Elements/BackendErrors";
import ProductAdded from "./Steps/ProductAdded";
const steps = [
  {
    label: "Basic Information",
    progress: 0,
    schema: basicProductInfo,
  },
  {
    label: "Images",
    progress: 0,
    schema: imagesSchema,
  },
  {
    label: "Description",
    progress: 0,
    schema: true,
  },
  {
    label: "Add Tags",
    progress: 0,
    schema: tagsValidations,
  },

  {
    label: "Publish",
    schema: true,
    progress: 0,
  },
];

const AddProduct = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("draftProduct")) || {},
  );
  const {
    setValue,
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(steps[currentStep]?.schema),
    defaultValues: data,
  });
  const [currentProgress, setCurrentProgress] = useState(0);

  const {
    createProduct,
    loading,
    product,
    formErrors,
    resetFormErrors,
    updateProduct,
  } = useProducts();

  const gotoPrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };
  const onSubmit = async (entry) => {
    if (currentStep === 0) {
      setData({ ...entry });
      const saveCategories = entry.categories?.map((item) => item.value);
      const id = await createProduct({
        ...entry,
        brand: entry.brand.value,
        categories: saveCategories,
      });
      if (id) {
        localStorage.setItem("draftProductId", id);
        setCurrentStep((prev) => prev + 1);
      }
    }
    if (currentStep === 1) {
      setData({ ...data, ...entry });
      setCurrentStep((prev) => prev + 1);
    }
    if (currentStep === 2) {
      setData({ ...data, ...entry });
      const response = await updateProduct(
        localStorage.getItem("draftProductId") || product?._id,
        {
          description: entry.description,
        },
      );
      if (response) {
        setCurrentStep((prev) => prev + 1);
      }
    }
    if (currentStep === 3) {
      setData({ ...data, ...entry });
      const response = await updateProduct(
        localStorage.getItem("draftProductId") || product?._id,
        {
          tags: entry.tags,
        },
      );
      if (response) {
        setCurrentStep((prev) => prev + 1);
      }
    }

    steps[currentStep].progress = 100;
  };
  const nextStep = async () => {
    const valid = await trigger();

    if (valid) {
      handleSubmit(onSubmit)();
    }
  };

  const syncProductDataWithLocalStorage = () => {
    let draftProduct = JSON.parse(localStorage.getItem("draftProduct"));
    draftProduct = { ...draftProduct, ...data };
    localStorage.setItem("draftProduct", JSON.stringify(draftProduct));
  };

  const nextButtonTitle = () => {
    if (isFirstStep()) {
      return "Create Product";
    } else if (isLastStep()) {
      return "Publish Product";
    } else {
      return "Save & Next";
    }
  };
  const isFirstStep = () => {
    if (currentStep === 0) {
      return true;
    }
    return false;
  };
  const isLastStep = () => {
    if (currentStep === steps.length - 1) {
      return true;
    }
    return false;
  };
  const resetFormStates = () => {
    localStorage.removeItem("draftProductId");
    localStorage.removeItem("draftProduct");
    reset();
    setData({});
    setCurrentStep(0);
    steps?.forEach((item) => (item.progress = 0));
  };

  useEffect(() => {
    syncProductDataWithLocalStorage();
  }, [data]);
  useEffect(() => {
    return () => {
      resetFormErrors();
      resetFormStates();
    };
  }, []);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <BreadCrumb />
          {product._id}
        </div>
      </div>
      <div className="flex items-center justify-between">
        {product?.status && (
          <div>
            <p className="text- font-medium text-gray-600">
              Status :{" "}
              <span
                className={`p-2 bg-yellow-300 border border-yellow-500 text-black rounded-sm capitalize`}
              >
                {product.status}
              </span>
            </p>
          </div>
        )}
      </div>
      <div className="py-2 px-2">
        <CustomStepper steps={steps} activeStep={currentStep} />
      </div>
      {/* <form action=""> */}
      <form>
        <BackendErrors formErrors={formErrors} />

        {currentStep === 0 && (
          <>
            <BasicProductInfo
              defaultData={data}
              register={register}
              errors={errors}
              setValue={setValue}
              watch={watch}
              control={control}
            />
          </>
        )}
        {currentStep === 1 && (
          <Images
            productId={product?._id}
            errors={errors}
            setValue={setValue}
          />
        )}
        {currentStep === 2 && (
          <Description defaultData={data} setValue={setValue} errors={errors} />
        )}
        {/* {currentStep === 4 && <Inventory />} */}
        {currentStep === 3 && (
          <AddTags
            defaultData={data}
            register={register}
            errors={errors}
            setValue={setValue}
          />
        )}
        {currentStep === 4 && (
          <ProductAdded
            resetForm={resetFormStates}
            getUpdatedProgress={(progress) => {
              steps[currentStep].progress = progress;
            }}
          />
        )}
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
        {!isLastStep() && (
          <div className="fixed bottom-0 right-0 bg-[#e6e6e6] w-[100%] border-t-1 border-t-[#d5d5d5] z-98">
            <div className="flex gap-3 justify-end p-4 rounded-sm">
              {/* <Link className="custom-btn bg-transparent! border border-gray-400! !font-[500] text-sm">
                Save Draft
              </Link> */}
              <CustomBtn
                disabled={currentStep === 1}
                type="button"
                title={"Reset"}
                onClick={resetFormStates}
                className=" !bg-blue-500 !text-white !font-[500] text-sm rounded-lg!"
                textPadding={1}
              />
              <CustomBtn
                disabled={currentStep === 1}
                type="button"
                title={"Previous"}
                onClick={gotoPrevious}
                className=" !bg-blue-500 !text-white !font-[500] text-sm rounded-lg!"
                textPadding={1}
                loading={loading}
              />

              <CustomBtn
                type="button"
                disabled={loading}
                loading={loading}
                title={nextButtonTitle()}
                onClick={nextStep}
                className=" !bg-blue-500 !text-white !font-[500] text-sm rounded-lg!"
                textPadding={1}
              />
            </div>
          </div>
        )}
      </form>
      {/* </form> */}
    </div>
  );
};

export default AddProduct;
