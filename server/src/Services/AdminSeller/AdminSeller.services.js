import ApiError from "../../Helpers/ApiError.js";
import Categories from "../../Models/category.js";
import Brands from "../../Models/brand.js";
export const getCategoryService = async (level) => {
  if (!level) {
    throw new ApiError(404, "Level must be provided.");
  }
  if (level > 3) {
    throw new ApiError(404, "Categories not found.");
  }
  const categories = await Categories.find({ level, isActive: true }).select(
    "name slug createdAt updatedAt isActive image.url childCategories",
  );
  return categories;
};

export const getBrandList = async () => {
  const brands = await Brands.find({ isActive: true })
    .select("_id name slug")
    .lean();
  return brands;
};

export const getBrands = async () => {
  const brands = await Brands.find()
    .populate({ path: "categories", select: "name" })
    .lean();
  return brands;
};
