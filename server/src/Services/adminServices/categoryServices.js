import ApiError from "../../Helpers/ApiError.js";
import Categories from "../../Models/category.js";
import {
  uploadWithRetry,
  deleteFromCloudinary,
} from "../../Helpers/cloudinary.js";
import fs from "fs";
export const createCategoryService = async (
  { name, parent, level, attributes },
  file
) => {
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
  let parentCategory = null;
  if (level >= 2) {
    parentCategory = await Categories.findOne({ slug: parent }).select(
      "_id level name slug"
    );

    if (!parentCategory) {
      fs.unlinkSync(file.path);
      throw new ApiError(404, "Parent category not found.");
    }

    if (level === 3 && parentCategory.level < 2) {
      fs.unlinkSync(file.path);
      throw new ApiError(400, "Parent must be a level-2 subcategory.");
    }
  }

  const uploaded = await uploadWithRetry(file.path);
  if (!uploaded) {
    fs.unlinkSync(file.path);
    throw new ApiError(400, "Technical issue, cannot upload image.");
  }
  const categoryData = {
    name,
    parentCategory: parentCategory ? parentCategory._id : null,
    level,
    image: {
      url: uploaded.url,
      public_id: uploaded.public_id,
    },
  };

  if (level === 3) {
    if (attributes?.length > 0) categoryData.attributes = attributes;
  } else if (level < 3) {
    fs.unlinkSync(file.path);
    throw new ApiError(
      400,
      "Attributes can only be added to level-3 categories only."
    );
  }
  const createdCategory = await Categories.create(categoryData);
  fs.unlinkSync(file.path);
  if (!createdCategory)
    throw new ApiError(400, "Technical issue, cannot create category.");

  const savedCategory = {
    name: createdCategory.name,
    parentCategory: {
      name: parentCategory.name,
      slug: parentCategory.slug,
    },
    level: createdCategory.level,
    image: createdCategory.image.url,
    slug: createdCategory.slug,
    attributes: createdCategory.attributes,
    isActive: createdCategory.isActive,
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
  { slug, level = 1, name, isActive, attributes },
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

  if (level === 3) {
    if (attributes?.length > 0) category.attributes = attributes;
  } else if (level < 3) {
    fs.unlinkSync(file.path);
    throw new ApiError(
      400,
      "Attributes can only be added to level-3 categories only."
    );
  }
  const saved = await category.save();
  if (!saved) {
    fs.unlinkSync(file.path);
    throw new ApiError(500, "Technical issue, cannot save category.");
  }

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
      attributes: category.attributes,
    },
  };
};

export const recursiveDeleteCategoryService = async (categoryId) => {
  //1. find category
  const category = await Categories.findById(categoryId);
  if (!category) throw new ApiError(400, "Cannot find category.");

  // 2. delete its images from cloudinary
  if (category.image?.public_id) {
    await deleteFromCloudinary(category.image.public_id);
  }

  // 3. find its children categories  --> Post-order Depth First Search
  const childrens = await Categories.find({
    parentCategory: categoryId,
  }).select("_id");

  // 4. Recursively delete children
  for (const child of childrens) {
    await recursiveDeleteCategoryService(child._id);
  }
  // 5.Delete this category
  await Categories.deleteOne(category._id);
};

const recursivelyBuildCategoryTree = async (parentId = null) => {
  const categories = await Categories.find({ parentCategory: parentId });

  let result = [];
  for (const category of categories) {
    const children = await recursivelyBuildCategoryTree(category._id);
    result.push({
      name: category.name,
      slug: category.slug,
      subcategories: children,
      image: category.image,
    });
  }

  return result;
};

export const getStructuredCategories = async () => {
  const structuredCategories = await recursivelyBuildCategoryTree(null);

  if (!structuredCategories.length) {
    throw new ApiError(400, "No categories found.");
  }

  return structuredCategories;
};
