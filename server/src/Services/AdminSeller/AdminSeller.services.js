import ApiError from "../../Helpers/ApiError.js";
import Categories from "../../Models/category.js";
export const getCategoryService = async (level) => {
  if (!level) {
    throw new ApiError(404, "Level must be provided.");
  }
  if (level > 3) {
    throw new ApiError(404, "Categories not found.");
  }
  const categories = await Categories.find({ level }).select(
    "name slug createdAt updatedAt isActive image.url childCategories",
  );
  if (categories.length <= 0) {
    throw new ApiError(404, "Categories not found.");
  }
  return categories;
};
