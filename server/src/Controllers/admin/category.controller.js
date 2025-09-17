import ApiResponse from "../../Helpers/ApiResponse.js";
import AsyncWrapper from "../../Helpers/AsyncWrapper.js";
import {
  createCategoryService,
  getCategoryService,
  recursiveDeleteCategoryService,
  updateCategoryService,
} from "../../Services/adminServices/categoryServices.js";
import Categories from "../../Models/category.js";
import fs from "fs";
import ApiError from "../../Helpers/ApiError.js";
import e from "express";

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
    let err = error;
    fs.unlink(req.file.path, (errors) => (err += errors));
    next(err);
  }
});

export const getCategories = AsyncWrapper(async (req, res) => {
  const categories = await getCategoryService(req.params);
  return res
    .status(200)
    .json(new ApiResponse(200, categories, `Categories found.`));
});

export const updateCategory = AsyncWrapper(async (req, res, next) => {
  const { slug } = req.params;
  const { category } = await updateCategoryService(
    { ...req.data, slug },
    req.file
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        category,
        `Level-${category.level} category updated.`
      )
    );
});

export const deleteCategory = AsyncWrapper(async () => {
  const { slug, level } = req.params;
  console.log(slug,level);
  const categoryId = await Categories.find({ slug, level }).select("_id");
  const deleteCategory = await recursiveDeleteCategoryService(categoryId);
  return res
    .status(200)
    .json(new ApiResponse(200, null, `category deleted along with childrens.`));
});
