import Product from "../../Models/product.js";

export const getProductsService = async ({ limit = 20, page = 1 }) => {
  console.log(limit, page);
  let skip = 0;
  let products;
  if (limit > 0 && page > 1) {
    skip = limit * page;
    products = await Product.find()
      .limit(limit)
      .skip(skip)
      .populate({ path: "brand", select: "name" })
      .populate({ path: "seller", select: "name" })
      .populate({ path: "categories", select: "name" });
    return products;
  }
  products = await Product.find()
    .populate({ path: "brand", select: "name" })
    .populate({ path: "seller", select: "name" })
    .populate({ path: "categories", select: "name" });
  return products;
};
