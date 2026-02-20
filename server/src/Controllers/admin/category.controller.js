import ApiResponse from "../../Helpers/ApiResponse.js";
import AsyncWrapper from "../../Helpers/AsyncWrapper.js";
import {
  createCategoryService,
  recursiveDeleteCategoryService,
  updateCategoryImage,
  updateCategoryService,
  updateCategoryStatusService,
  getSingleCategoryService,
} from "../../Services/adminServices/categoryServices.js";
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
    if (req.file) {
      fs.unlink(req.file?.path);
    }
    next(error);
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

export const updateCategoryStatus = AsyncWrapper(async (req, res) => {
  const { category } = await updateCategoryStatusService(req.params, req.body);
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        category,
        `Level-${category.level} category ${category.isActive ? "enabled." : "disabled"}.`,
      ),
    );
});

export const updateCategoryImageController = AsyncWrapper(
  async (req, res, next) => {
    const { catId } = req.params;
    console.log(req.file);
    try {
      const updatedCategory = await updateCategoryImage(catId, req.file);
      return res
        .status(200)
        .json(new ApiResponse(200, updatedCategory, `category updated.`));
    } catch (error) {
      if (req.file) {
        fs.unlink(req.file?.path);
      }
      next(error);
    }
  },
);

export const deleteCategory = AsyncWrapper(async (req, res) => {
  const { categoryId } = req.params;
  await recursiveDeleteCategoryService(categoryId);
  return res
    .status(200)
    .json(new ApiResponse(200, null, `category deleted along with childrens.`));
});

//! todo-> fix needed in category file deletion in catch block in createCategories.

export const getSingleCategory = AsyncWrapper(async (req, res) => {
  const category = await getSingleCategoryService(req.params);
  return res
    .status(200)
    .json(new ApiResponse(200, category, `Category found.`));
});
