import ApiResponse from "../../Helpers/ApiResponse.js";
import AsyncWrapper from "../../Helpers/AsyncWrapper.js";
import { createBrandService } from "../../Services/adminServices/brandServices.js";
import fs from "fs";
export const createBrand = AsyncWrapper(async (req, res, next) => {
  try {
    const { brand } = await createBrandService(req.data, req.file);
    return res
      .status(200)
      .json(new ApiResponse(200, brand, "Brand created successfully."));
  } catch (error) {
    let err = error;
    fs.unlink(req.file.path, (errors) => (err += errors));
    next(err);
  }
});
