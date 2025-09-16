import ApiResponse from "../../Helpers/ApiResponse.js";
import AsyncWrapper from "../../Helpers/AsyncWrapper.js";
import { createCategoryService } from "../../Services/adminServices/categoryServices.js";
import fs from "fs";

export const createCategory = AsyncWrapper(async (req, res, next) => {
  try {
    const { category } = await createCategoryService(req.data, req.file);
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          category,
          `Level-${category.level} category created successfully.`
        )
      );
  } catch (error) {
    fs.unlinkSync(req.file.path);
    next(error);
  }
});
