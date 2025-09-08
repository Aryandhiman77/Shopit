import React, { useState } from "react";
import BreadCrumb from "../../../Reusables/Elements/BreadCrumb";
import { TextField } from "@mui/material";
import DropDownField from "../../../Reusables/DropDownField";
import TinyEditor from "../../../Reusables/TinyEditor";
import ImageDropBox from "../../../Reusables/ImageDropBox";

const AddProduct = () => {
  const [thumbnail,setThumbnail] = useState([]);
  const [gallery,setGallery] = useState([]);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-[700] text-black">Add Product</h1>
          <BreadCrumb />
        </div>
      </div>
      <form action="">
        <div className="heading-1 py-3">Summary</div>
        <div className="flex flex-col gap-4">
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

          <div>
            <h1 className="heading-1 px-1 py-3">Product description</h1>
            <TinyEditor />
          </div>
          <div className="w-full">
            <h1 className="heading-1 px-1 py-2">Product Images</h1>
            <h3 className="px-1 py-3 text-sm font-[500]">Product Thumbnail</h3>
            <ImageDropBox maxFiles={1} setImages={setThumbnail}/>
            <h3 className="px-1 py-3 text-sm font-[500]">Product Gallery</h3>
            <ImageDropBox maxFiles={10} setImages={setGallery}/>
          </div>
          <div>
            <h1 className="heading-1 py-4">Price</h1>
            <div className="flex flex-row gap-10">
              
            <TextField
              className="w-1/2"
              label="MRP"
              variant="outlined"
              required={true}
              size="small"
              type={"text"}
            />
            <TextField
              className="w-1/2"
              label="Discount in percentage (%)"
              variant="outlined"
              required={true}
              size="small"
              type={"text"}
            />
            <TextField
              className="w-1/2"
              label="Sale Price (tax incl.)"
              variant="outlined"
              required={true}
              size="small"
              type={"text"}
            />
           
          </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
