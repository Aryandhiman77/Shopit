import ApiResponse from "../../Helpers/ApiResponse.js";
import AsyncWrapper from "../../Helpers/AsyncWrapper.js";
import {
  createCategoryService,
  recursiveDeleteCategoryService,
  updateCategoryImage,
  updateCategoryService,
} from "../../Services/adminServices/categoryServices.js";
import Categories from "../../Models/category.js";
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
          `Level-${category.level} category created successfully.`,
        ),
      );
  } catch (error) {
    let err = error;
    if (req.file) {
      fs.unlink(req.file?.path, (errors) => (err += errors));
    }
    next(err);
  }
});

export const updateCategory = AsyncWrapper(async (req, res) => {
  const { catId } = req.params;
  const { category } = await updateCategoryService({ ...req.data, catId });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        category,
        `Level-${category.level} category updated.`,
      ),
    );
});
export const updateCategoryImageController = AsyncWrapper(
  async (req, res, next) => {
    const { catId } = req.params;
    try {
      const updatedCategory = await updateCategoryImage(catId, req.file);
      return res
        .status(200)
        .json(new ApiResponse(200, updatedCategory, `category updated.`));
    } catch (error) {}
  },
);

export const deleteCategory = AsyncWrapper(async (req, res) => {
  const { categoryId } = req.params;
  await recursiveDeleteCategoryService(categoryId);
  return res
    .status(200)
    .json(new ApiResponse(200, null, `category deleted along with childrens.`));
});
