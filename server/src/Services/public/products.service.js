import ApiError from "../../Helpers/ApiError.js";
import Categories from "../../Models/category.js";
import Product from "../../Models/product.js";
import Brand from "../../Models/brand.js";

export const getProductDetail = async ({ slug }) => {
  const product = await Product.findOne({ slug, status: "active" })
    .select("-_id")
    .populate([
      { path: "brand", select: "-_id name" },
      { path: "categories", select: "-_id name" },
    ]);
  return product;
};
