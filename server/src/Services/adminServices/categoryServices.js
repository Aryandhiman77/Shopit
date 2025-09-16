import ApiError from "../../Helpers/ApiError.js";
import Category from "../../Models/category.js";
import { uploadWithRetry } from "../../Helpers/cloudinary.js";
import fs from "fs";
export const createCategoryService = async ({ name, parent, level }, file) => {
  if (level >= 2 && !parent) {
    throw new ApiError(400, "Parent category is required.");
  }
  if (!file) {
    throw new ApiError(400, "Category image is required.");
  }
  const isExistingCategory = await Category.findOne({ name });
  if (isExistingCategory) {
    fs.unlinkSync(file.path);
    throw new ApiError(400, "Category already exists with this name.");
  }
  const parentCategory = await Category.findOne({ slug: parent }).select("_id");

  const uploaded = await uploadWithRetry(file.path);
  if (!uploaded) {
    throw new ApiError(400, "Technical issue, cannot upload image.");
  }

  const createdCategory = await Category.create({
    name,
    parentCategory: parentCategory.id,
    level,
    image: uploaded.url,
  });
  if (!createdCategory)
    throw new ApiError(400, "Technical issue, cannot create category.");
  fs.unlinkSync(file.path);
  return { category: createdCategory };
};
