import ApiError from "../../Helpers/ApiError.js";
import Categories from "../../Models/category.js";
import Product from "../../Models/product.js";
import Brand from "../../Models/brand.js";

const recursivelyBuildCategoryTree = async (parentId = null, userRole) => {
  const categories = await Categories.find({ parentCategory: parentId });
  let result = [];
  for (const category of categories) {
    const children = await recursivelyBuildCategoryTree(category._id, userRole);
    if (
      userRole === "admin" ||
      (userRole === "seller" && userRole !== undefined)
    ) {
      result.push({
        _id: category._id,
        name: category.name,
        childCategories: children,
        parentCategory: category.parentCategory,
        image: category.image,
        level: category.level,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
        isActive: category.isActive,
      });
    } else {
      result.push({
        name: category.name,
        slug: category.slug,
        subcategories: children,
        image: category.image,
      });
    }
  }

  return result;
};

export const getStructuredCategories = async (user = null) => {
  const structuredCategories = await recursivelyBuildCategoryTree(null, user);

  if (!structuredCategories.length) {
    throw new ApiError(400, "No categories found.");
  }

  return structuredCategories;
};

export const getCategoryService = async ({ level } = {}) => {
  if (level > 3) {
    throw new ApiError(404, "Categories not found.");
  }
  const categories = await Categories.find({ level })
    .select("name slug createdAt updatedAt isActive image.url -_id")
    .populate(
      "parentCategory",
      "name slug createdAt updatedAt isActive image.url -_id",
    );
  if (categories.length <= 0) {
    throw new ApiError(404, "Categories not found.");
  }
  return categories;
};

export const getCategoryProductsService = async ({ category } = {}) => {
  if (!category) return [];

  const cat = await Categories.findOne({ slug: category, isActive: true })
    .select("_id")
    .lean();

  if (!cat) return [];

  const products = await Product.find({ category: cat._id, status: "active" })
    .select("-_id title price mrp thumbnail brand category seller slug ")
    .populate([
      { path: "brand", select: "name slug -_id" },
      { path: "category", select: "name -_id" },
      { path: "seller", select: "name -_id" },
    ])
    .lean();
  return products;
};
export const getCategoryBrandsService = async ({ category } = {}) => {
  if (!category) return [];
  const cat = await Categories.findOne({ slug: category, isActive: true })
    .select("_id")
    .lean();
  if (!cat) return [];
  const brands = await Brand.find({
    categories: cat._id,
  })
    .select("name slug logo -_id")
    .lean();
  return brands;
};

export const getProductsByQueryStringFilters = async ({
  categoriesData,
  brandSlugs,
  price,
  sortSlugs,
}) => {
  let queryObject = {};

  if (brandSlugs) {
    const brandIds = await Brand.find({
      slug: brandSlugs,
    }).select("_id");
    queryObject.brand = brandIds;
  }
  if (categoriesData) {
    const categoryData = await Categories.find({
      slug: { $in: ["smartphones", "laptops"] },
    }).select("_id parentCategory");
    console.log(categoryData);
    const catids = categoryData?.map((data) => data._id);
    const childCatIds = await Categories.find({
      parentCategory: categoryData.parentCategory,
    }).select("_id");

    queryObject.category = [...catids, ...childCatIds];
  }

  const products = await Product.find(queryObject);
  return products;
};
