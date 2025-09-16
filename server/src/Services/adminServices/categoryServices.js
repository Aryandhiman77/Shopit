import ApiError from "../../Helpers/ApiError.js";
import Categories from "../../Models/category.js";
import {
  uploadWithRetry,
  deleteFromCloudinary,
} from "../../Helpers/cloudinary.js";
import fs from "fs";
export const createCategoryService = async ({ name, parent, level }, file) => {
  if (level >= 2 && !parent) {
    throw new ApiError(400, "Parent category is required.");
  }
  if (!file) {
    throw new ApiError(400, "Category image is required.");
  }
  const isExistingCategory = await Categories.findOne({ name });
  if (isExistingCategory) {
    fs.unlinkSync(file.path);
    throw new ApiError(400, "Category already exists with this name.");
  }
  const parentCategory = await Categories.findOne({ slug: parent }).select(
    "_id level"
  );

  if (level >= 2 && !parentCategory) {
    throw new ApiError(404, "Parent category not found.");
  }
  if (level === 3 && parentCategory.level < 2) {
    throw new ApiError(404, "Parent level-2 subcategory not found.");
  }

  const uploaded = await uploadWithRetry(file.path);
  if (!uploaded) {
    throw new ApiError(400, "Technical issue, cannot upload image.");
  }

  const createdCategory = await Categories.create({
    name,
    parentCategory,
    level,
    image: {
      url: uploaded.url,
      public_id: uploaded.public_id,
    },
  });
  if (!createdCategory)
    throw new ApiError(400, "Technical issue, cannot create category.");
  fs.unlinkSync(file.path);
  const savedCategory = {
    name: createdCategory.name,
    parentCategory: {
      name: createdCategory.parentCategory.name,
      slug: createdCategory.parentCategory.slug,
    },
    level: createdCategory.level,
    image: createdCategory.image.url,
    slug: createdCategory.slug,
  };
  return { category: savedCategory };
};

export const getCategoryService = async ({ level }) => {
  const categories = await Categories.find({ level })
    .select("name slug createdAt updatedAt isActive image.url -_id")
    .populate(
      "parentCategory",
      "name slug createdAt updatedAt isActive image.url -_id"
    );
  if (categories.length <= 0) {
    throw new ApiError(404, "Categories not found.");
  }
  return categories;
};

export const updateCategoryService = async (
  { slug, level, name, isActive },
  file
) => {
  const category = await Categories.findOne({ slug, level }).populate(
    "parentCategory",
    "name slug"
  );

  if (!category) {
    if (file?.path) fs.unlinkSync(file.path);
    throw new ApiError(404, "Category not found.");
  }

  let uploaded;

  // If file provided, upload new image
  if (file) {
    uploaded = await uploadWithRetry(file.path);
    fs.unlinkSync(file.path);

    if (!uploaded) {
      throw new ApiError(400, "Technical issue, cannot upload image.");
    }

    // delete old image from Cloudinary if exists
    if (category.image?.public_id) {
      await deleteFromCloudinary(category.image.public_id);
    }

    category.image = {
      url: uploaded.url,
      public_id: uploaded.public_id,
    };
  }

  if (name) category.name = name;
  if (isActive !== undefined) category.isActive = isActive;

  await category.save();

  return {
    category: {
      name: category.name,
      parentCategory: category.parentCategory
        ? {
            name: category.parentCategory.name,
            slug: category.parentCategory.slug,
          }
        : null,
      level: category.level,
      image: category.image?.url || null,
      slug: category.slug,
      isActive: category.isActive,
    },
  };
};
