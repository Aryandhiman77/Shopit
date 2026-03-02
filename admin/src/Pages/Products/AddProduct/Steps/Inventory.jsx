import { TextField } from "@mui/material";
import React from "react";
import Box from "../../../../Components/Reusables/Elements/Box";

const Inventory = () => {
  return (
    <Box className={"!bg-white mb-25!"}>
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
  );
};

export default Inventory;
