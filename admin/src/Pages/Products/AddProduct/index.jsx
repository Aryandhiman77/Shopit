import React, { useState } from "react";
import BreadCrumb from "../../../Components/Reusables/Elements/BreadCrumb";
import { TextField } from "@mui/material";
import DropDownField from "../../../Components/Reusables/DropDownField";
import TinyEditor from "../../../Components/Reusables/TinyEditor";
import ImageDropBox from "../../../Components/Reusables/ImageDropBox";
import CustomToggle from "../../../Components/Reusables/Elements/CustomToggle";
import Box from "../../../Components/Reusables/Elements/Box";
import { Link } from "react-router-dom";
import { PiPlus, PiPlusBold } from "react-icons/pi";

const AddProduct = () => {
  const [thumbnail, setThumbnail] = useState([]);
  const [gallery, setGallery] = useState([]);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-[700] text-black">Add Product</h1>
          <BreadCrumb />
        </div>
      </div>
      <form action="">
        <div className="flex flex-col gap-4">
          <div className="heading-1">Summary</div>
          <Box className={"flex flex-col gap-4 bg-white"}>
            <div className="flex flex-row gap-10">
              <TextField
                className="w-1/2"
                label="Product Title"
                variant="outlined"
                required={true}
                size="small"
                type={"text"}
              />
              <TextField
                className="w-1/2"
                label="Product SKU"
                variant="outlined"
                required={true}
                size="small"
                type={"text"}
              />
            </div>
            <div className="flex flex-row gap-10">
              <DropDownField title={"Category (Level-1)"} items={["sdf"]} />
              <DropDownField title={"Category (Level-2)"} items={["sdf"]} />
              <DropDownField title={"Category (Level-3)"} items={["sdf"]} />
            </div>
            <textarea
              id="message"
              rows="2"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write brief description about product in 200 ..."
              maxLength={200}
            ></textarea>
          </Box>

          <div>
            <h1 className="heading-1 px-1 py-3">Product description</h1>
            <TinyEditor />
          </div>
          <div className="w-full">
            <h1 className="heading-1 px-1 py-2">Product Images</h1>
            <h3 className="px-1 py-3 text-sm font-[500]">Product Thumbnail</h3>
            <ImageDropBox maxFiles={1} setImages={setThumbnail} />
            <h3 className="px-1 py-3 text-sm font-[500]">Product Gallery</h3>
            <ImageDropBox maxFiles={10} setImages={setGallery} />
          </div>
          <Box className={"bg-white"}>
            <h1 className="heading-1 py-4">Price</h1>
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
                label="Discount in percentage (%)"
                variant="outlined"
                required={true}
                size="small"
                type={"number"}
              />
              <TextField
                className="w-1/2"
                label="Sale Price (tax incl.)"
                variant="outlined"
                required={true}
                size="small"
                type={"number"}
              />
            </div>
          </Box>
          <Box className={"!bg-white"}>
            <h1 className="heading-1 py-4">Inventory Tracking</h1>
            <div className="pb-4 flex flex-col gap-2">
              <div className="flex ">
                <div className="flex items-center h-5">
                  <input
                    id="inventory-1"
                    aria-describedby="helper-radio-text"
                    name="inventory"
                    type="radio"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div className="ms-2 text-sm">
                  <label
                    htmlFor="inventory-1"
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
                    id="inventory-2"
                    name="inventory"
                    aria-describedby="helper-radio-text"
                    type="radio"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div className="ms-2 text-sm">
                  <label
                    htmlFor="inventory-2"
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
          </Box>
          <div className="flex flex-row gap-10 items-center my-4">
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
          </div>
          <Box className={"flex  items-center gap-10  bg-white"}>
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
          </Box>
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
          <Box className={"flex flex-col gap-4  bg-white"}>
            <h1 className="heading-1">Product Tags</h1>
            <TextField
              className="w-1/2"
              label="Product Slug"
              variant="outlined"
              required={true}
              size="small"
              type={"number"}
            />
            <div>
              <Link className="custom-btn custom-shadow !bg-blue-500 !text-white text-sm">
                Add Tag
              </Link>
            </div>
          </Box>
          <Box className={"bg-white flex flex-col gap-4"}>
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
          </Box>
          <div className="flex gap-3 justify-end">
            <Link className="custom-btn !bg-black !text-white !font-[500] text-sm">
              Save as Draft
            </Link>
            <Link className="custom-btn !bg-blue-500 !text-white !font-[500] text-sm">
              Create Product
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
