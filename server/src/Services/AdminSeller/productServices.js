import Product from "../../Models/product.js";
import ApiError from "../../Helpers/ApiError.js";
import {
  deleteFromCloudinary,
  uploadWithRetry,
} from "../../Helpers/cloudinary.js";
import unlinkFiles from "../../Helpers/fileUnlinker.js";
import Category from "../../Models/category.js";
import Brand from "../../Models/brand.js";

export const createProductService = async (
  {
    title,
    shortDescription,
    categories,
    tags,
    base_price,
    base_mrp,
    stock,
    brand,
  },
  creater_user_id,
) => {
  const product = await Product.create({
    title,
    shortDescription,
    categories,
    tags,
    status: "draft",
    seller: creater_user_id,
    price: base_price,
    mrp: base_mrp,
    brand,
  });

  if (!product) {
    throw new ApiError(404, "Categories not found.");
  }
  const sendProduct = {
    title: product.title,
    shortDescription: product.shortDescription,
    status: product.status,
    _id: product._id,
    mrp: product.mrp,
    price: product.price,
  };
  return sendProduct;
};

export const getProducts = async ({ filter }, sellerId) => {
  return await Product.find({ status: filter, seller: sellerId });
};
export const getAllProducts = async (sellerId) => {
  return await Product.find({ seller: sellerId });
};

export const addThumbnailService = async (productId, thumbnail) => {
  if (!productId || productId === "null") {
    throw new ApiError(400, "Cannot identify product.", [
      "Cannot identify product.",
    ]);
  }
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product not found.");
  }
  if (!thumbnail) {
    throw new ApiError(400, "Please add a thumbnail.", ["Add a thumbnail."]);
  }
  const uploaded = await uploadWithRetry(thumbnail.path);
  if (!uploaded) throw new ApiError(400, "Cannot upload thumbnail.");

  product.thumbnail.url = uploaded.url;
  product.thumbnail.public_id = uploaded.public_id;

  const saved = await product.save();
  if (!saved) {
    throw new ApiError(400, "Cannot save product.");
  }

  await unlinkFiles(thumbnail);
  return saved.thumbnail.url;
};

export const addGalleryImagesService = async (productId, gallery) => {
  if (!productId || productId === "null") {
    throw new ApiError(400, "Cannot identify product.", [
      "Cannot identify product.",
    ]);
  }
  if (!gallery || gallery.length === 0) {
    throw new ApiError(400, "Please add a gallery.");
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product not found.");
  }

  if (product.gallery.length + gallery.length > 10) {
    throw new ApiError(400, "Maximum 10 gallery images allowed");
  }

  let uploadedImages = [];

  try {
    // upload images
    uploadedImages = await Promise.all(
      gallery.map((img) => uploadWithRetry(img.path)),
    );

    const formattedImages = uploadedImages.map((img) => ({
      public_id: img.public_id,
      url: img.secure_url,
    }));

    product.gallery.push(...formattedImages);
    await product.save();

    return product.gallery.map(
      (item) =>
        (item.url !== "" || item.url !== undefined || item.url !== null) &&
        item.url,
    );
  } catch (error) {
    // rollback cloudinary uploads if DB fails
    if (uploadedImages.length) {
      await Promise.allSettled(
        uploadedImages.map((img) => deleteFromCloudinary(img.public_id)),
      );
    }
    throw error;
  } finally {
    await unlinkFiles(gallery);
  }
};

export const addProductAttributes = async ({ productId, attributes }) => {
  const product = await Product.findByIdAndUpdate(
    productId,
    { $set: { attributes } },
    { new: true, runValidators: true },
  );
  if (!product) {
    throw new ApiError(400, "Cannot add attributes.");
  }
  return product;
};

export const deleteGalleryImages = async (productId, publicIds) => {
  if (!Array.isArray(publicIds) || publicIds.length === 0) {
    throw new ApiError(400, "No images provided for deletion.");
  }

  const product = await Product.findById(productId).select("gallery");
  if (!product) {
    throw new ApiError(404, "Product not found.");
  }

  // check images belong to product
  const existingIds = product.gallery.map((img) => img.public_id);
  const invalidIds = publicIds.filter((id) => !existingIds.includes(id));

  if (invalidIds.length) {
    throw new ApiError(400, "Some images do not belong to this product.");
  }

  // remove from DB first
  const deleted = await Product.findByIdAndUpdate(productId, {
    $pull: { gallery: { public_id: { $in: publicIds } } },
  });
  if (!deleted) {
    throw new ApiError(400, "Cannot delete images.");
  }

  // delete from Cloudinary
  const results = await Promise.allSettled(
    publicIds.map((id) => deleteFromCloudinary(id)),
  );

  const failed = results.filter((r) => r.status === "rejected");

  if (failed.length) {
    console.error("Cloudinary deletion failed:", failed);
  }

  return {
    deleted: publicIds.length - failed.length,
    failed: failed.length,
  };
};

export const updateProductStatusService = async (productId, status) => {
  const product = await Product.findByIdAndUpdate(
    productId,
    { status },
    { new: true },
  );

  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  if (status === "active" && !product.thumbnail.public_id) {
    throw new ApiError(404, "Add thumbnail image.");
  }
  return product;
};

export const getProductsService = async ({
  limit,
  page,
  categories,
  sort_by,
  search,
  brands,
  createdDate,
  updatedDate,
  stock,
  minPrice,
  maxPrice,
  featured,
  trending,
  status,
  sortOrder = "asc",
}) => {
  const OFFSET = parseInt(page) > 0 ? parseInt(page) - 1 : 0; // mandatory
  const LIMIT = parseInt(limit) || 40; // mandatory
  const SKIP = OFFSET * LIMIT;
  const SORTING_ORDER = sortOrder === "desc" ? -1 : 1;
  const SORT = sort_by
    ? { [sort_by]: SORTING_ORDER }
    : { price: SORTING_ORDER }; // default sort by price

  const STOCK_STATUS = [
    "in-stock",
    "out-of-stock",
    "low-stock",
    "tracking-disabled",
    "all",
  ];
  let query = {};
  if (categories) {
    const CATEGORIES = categories ? categories.split(",") : ["all"];
    let categoriesIds = await Category.find({
      slug: { $in: [...CATEGORIES] },
    });
    categoriesIds = categoriesIds?.map((cat) => cat._id);
    query.categories = { $in: [...categoriesIds] };
  }

  if (brands) {
    const BRANDS = brands ? brands.split(",") : ["all"];
    let brandIds = await Brand.find({
      slug: { $in: [...BRANDS] },
    });
    brandIds = brandIds?.map((brand) => brand._id);
    query.brand = { $in: [...brandIds] };
  }
  if (minPrice) query.price = { $gte: Number(minPrice) };
  if (maxPrice) query.price = { $lte: Number(maxPrice) };

  if (createdDate) {
    query.createdAt = { $gte: new Date(createdDate) };
  }
  if (updatedDate) {
    query.modifiedAt = { $gte: new Date(updatedDate) };
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
    query.stock = { lowStockAlert: { $or: [{ $eq: stock }, { $lt: stock }] } };
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
  console.log("query", JSON.stringify(query));
  const products = await Product.find({
    ...query,
  })
    .sort(SORT)
    .limit(LIMIT)
    .skip(SKIP)
    .populate([
      { path: "categories", select: "name" },
      { path: "seller", select: "name" },
      { path: "brand", select: "name" },
    ])
    .lean();
  const totalDocuments = await Product.countDocuments(query).lean();
  return { products, total: totalDocuments, limit: LIMIT, page: OFFSET + 1 };
};

export const updateProductService = async (
  productId,
  {
    title,
    shortDescription,
    categories,
    tags,
    base_price,
    base_mrp,
    stock,
    brand,
    description,
  },
) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(400, "Product not found.", ["Product not found."]);
  }
  if (title) product.title = title;
  if (shortDescription) product.shortDescription = shortDescription;
  if (description) product.description = description;
  if (categories) product.categories = categories;
  if (base_price) product.price = base_price;
  if (base_mrp) product.mrp = base_mrp;
  if (tags) product.tags = tags;
  if (stock) product.stock = brand;
  if (brand) product.brand = brand;

  const saved = await product.save();
  if (!saved) {
    throw new ApiError(400, "Product updation failed.", [
      "Product updation failed.",
    ]);
  }
  return saved;
};
