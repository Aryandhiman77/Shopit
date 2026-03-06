import Product from "../../Models/product.js";
import ApiError from "../../Helpers/ApiError.js";
import {
  deleteFromCloudinary,
  uploadWithRetry,
} from "../../Helpers/cloudinary.js";
import unlinkFiles from "../../Helpers/fileUnlinker.js";

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
  console.log(gallery);
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
