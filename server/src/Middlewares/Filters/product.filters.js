import Brand from "../../Models/brand.js";
import Category from "../../Models/category.js";
import Product from "../../Models/product.js";

const productFilters = async (req, _, next) => {
  const {
    categories,
    search,
    brands,
    created_at,
    updated_at,
    stock,
    minPrice,
    maxPrice,
    featured,
    trending,
    status,
  } = req.query;
  let query = {};

  const STOCK_STATUS = [
    "in-stock",
    "out-of-stock",
    "low-stock",
    "tracking-disabled",
    "all",
  ];
  if (categories) {
    const CATEGORIES = categories ? categories.split(",") : ["all"];
    let categoriesIds = await Category.find({
      slug: { $in: [...CATEGORIES] },
    })
      .select("_id")
      .lean();
    categoriesIds = categoriesIds?.map((cat) => cat._id);
    query.categories = { $in: [...categoriesIds] };
  }

  if (brands) {
    const BRANDS = brands ? brands.split(",") : ["all"];
    let brandIds = await Brand.find({
      slug: { $in: [...BRANDS] },
    })
      .select("_id")
      .lean();
    brandIds = brandIds?.map((brand) => brand._id);
    query.brand = { $in: [...brandIds] };
  }
  if (minPrice) query.price = { $gte: Number(minPrice) };
  if (maxPrice) query.price = { $lte: Number(maxPrice) };

  if (created_at) {
    query.createdAt = { $gte: new Date(created_at) };
  }
  if (updated_at) {
    query.updatedAt = { $gte: new Date(updated_at) };
  }
  const productStatus = Product.schema.path("status")?.enumValues;
  if (productStatus?.includes(status)) {
    query.status = status;
  }
  if (featured !== undefined) {
    query.isFeatured = featured === "true";
  }
  if (trending !== undefined) {
    query.isTrending = trending === "true";
  }

  if (stock === STOCK_STATUS[0]) {
    query.stock = { $gt: 0 };
  } else if (stock === STOCK_STATUS[1]) {
    query.stock = { $eq: 0 };
  } else if (stock === STOCK_STATUS[2]) {
    query = {
      $expr: {
        $lte: ["$stock", "$lowStockAlert"],
      },
    };
  } else if (stock === STOCK_STATUS[3]) {
    query.stock = { stockTracking: false };
  }

  if (search) {
    const SEARCH = new RegExp(search?.toString(), "i");
    query = {
      ...query,
      $or: [
        { title: { $regex: SEARCH } },
        { sku: { $regex: SEARCH } },
        { product_Id: { $regex: SEARCH } },
      ],
    };
  }

  req.filters = { ...query };
  next();
};

export default productFilters;
