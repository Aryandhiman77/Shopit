import ApiError from "../../Helpers/ApiError.js";
import Categories from "../../Models/category.js";
import {
  uploadWithRetry,
  deleteFromCloudinary,
} from "../../Helpers/cloudinary.js";
import fs from "fs";
import unlinkFiles from "../../Helpers/fileUnlinker.js";
export const createCategoryService = async (
  { name, parent, level, attributes, description },
  file,
) => {
  if (level >= 2 && !parent) {
    throw new ApiError(400, "Parent category is required.");
  }
  if (!file) {
    throw new ApiError(400, "Category image is required.");
  }
  const isExistingCategory = await Categories.findOne({ name });
  if (isExistingCategory) {
    fs.unlinkSync(file?.path);
    throw new ApiError(400, "Category already exists with this name.");
  }
  let parentCategory = null;
  if (level >= 2) {
    parentCategory = await Categories.findOne({ _id: parent }).select(
      "_id level name slug childCategories",
    );

    if (!parentCategory) {
      fs.unlinkSync(file?.path);
      throw new ApiError(404, "Parent category not found.");
    }

    if (level === 3 && parentCategory.level < 2) {
      fs.unlinkSync(file?.path);
      throw new ApiError(400, "Parent must be a level-2 subcategory.");
    }
  }

  const uploaded = await uploadWithRetry(file?.path);
  if (!uploaded) {
    fs.unlinkSync(file?.path);
    throw new ApiError(400, "Technical issue, cannot upload image.");
  }
  const categoryData = {
    name,
    description,
    parentCategory: parentCategory ? parentCategory._id : null,
    level,
    image: {
      url: uploaded.url,
      public_id: uploaded.public_id,
    },
  };

  if (attributes?.length > 0) categoryData.attributes = attributes;

  const createdCategory = await Categories.create(categoryData);
  fs.unlinkSync(file?.path);
  if (!createdCategory)
    throw new ApiError(400, "Technical issue, cannot create category.");
  if (level >= 2 && parentCategory) {
    parentCategory.childCategories.push(createdCategory?._id);
    await parentCategory.save();
  }

  const savedCategory = {
    _id: createdCategory._id,
    name: createdCategory.name,
    description: categoryData.description,
    parentCategory: {
      name: parentCategory?.name,
      slug: parentCategory?.slug,
    },
    level: createdCategory.level,
    image: createdCategory.image.url,
    slug: createdCategory.slug,
    attributes: createdCategory.attributes,
    isActive: createdCategory.isActive,
  };
  return { category: savedCategory };
};

export const updateCategoryService = async ({
  catId,
  name,
  // isActive,
  attributes,
  description,
  parent,
}) => {
  const category = await Categories.findById(catId).populate(
    "parentCategory",
    "name slug",
  );

  if (!category) {
    throw new ApiError(404, "Category not found.");
  }

  if (name) category.name = name;
  // if (isActive !== undefined) category.isActive = isActive;
  if (description) category.description = description;
  if (attributes?.length > 0) category.attributes = attributes;
  if (parent) {
    const newParent = await Categories.findOne({ _id: parent })
      .select("_id")
      .lean();
    if (!newParent) {
      throw new ApiError(500, "Cannot find parent category.");
    }
    category.parentCategory = newParent._id;
  }

  let saved = await category.save();
  if (!saved) {
    throw new ApiError(500, "Technical issue, cannot save category.");
  }
  saved = await Categories.findById(saved._id)
    .select("-attributes")
    .populate({
      path: "childCategories",
      select: "-attributes",
      populate: {
        path: "childCategories",
        select: "-attributes",
      },
    });

  return { category: saved };
};

export const updateCategoryStatusService = async ({ catId }, { isActive }) => {
  const category = await Categories.findById(catId).populate({
    path: "parentCategory",
    select: "isActive name",
  });
  if (!category) {
    throw new ApiError(400, "Invalid category.");
  }
  if (category.parentCategory?.isActive === false) {
    throw new ApiError(
      400,
      `First enable Parent Category (${category.parentCategory.name}).`,
    );
  }
  category.isActive = isActive;

  if (category.childCategories?.length && isActive === false) {
    const childrens = await Categories.find({
      _id: { $in: category.childCategories },
    }).select("childCategories");
    const subChildrens = childrens?.flatMap((child) => child.childCategories);
    await Categories.updateMany(
      { _id: { $in: [...category.childCategories, ...subChildrens] } },
      {
        $set: {
          isActive: false,
        },
      },
    );
  }
  let saved = await category.save();
  if (!saved) {
    throw new ApiError(500, "Technical issue, cannot save category.");
  }
  saved = await Categories.findById(saved._id)
    .select("-attributes")
    .populate({
      path: "childCategories",
      select: "-attributes",
      populate: {
        path: "childCategories",
        select: "-attributes",
      },
    });

  return { category: saved };
};

export const updateCategoryImage = async (catId, image) => {
  const category = await Categories.findById(catId);
  if (!category) throw new ApiError(400, "Cannot find category.");
  // delete previous image
  if (category.image.public_id) {
    await deleteFromCloudinary(category.image.public_id);
  }
  // add new imag
  if (!image) {
    throw new ApiError(400, "Category image is required.");
  }
  const uploaded = await uploadWithRetry(image.path);
  if (!uploaded) throw new ApiError(400, "Cannot upload image.");

  category.image.public_id = uploaded.public_id;
  category.image.url = uploaded.secure_url;
  const saved = await category.save();
  if (!saved) {
    throw new ApiError(400, "Cannot save image.");
  }
  unlinkFiles(image);
};

export const recursiveDeleteCategoryService = async (categoryId) => {
  //1. find category
  const category = await Categories.findById(categoryId);
  if (!category) throw new ApiError(400, "Cannot find category.");

  if (category.level === 3) {
    if (category.image?.public_id) {
      await deleteFromCloudinary(category.image.public_id);
    }
    //find its parent and unlink this category
    await Categories.findByIdAndUpdate(category?.parentCategory, {
      $pull: { childCategories: category._id },
    });
    return;
  }

  if (category === 2) {
    if (category.image?.public_id) {
      await deleteFromCloudinary(category.image.public_id);
    }
    await Categories.findByIdAndUpdate(category?.parentCategory, {
      $pull: { childCategories: category._id },
    });
  }

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

export const getSingleCategoryService = async ({ catId }) => {
  const category = await Categories.findById(catId, { attributes: { _id: 0 } });
  if (!category) throw new ApiError(400, "No category found.");
  return category;
};
