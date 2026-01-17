import Product from "../../Models/product.js";
import ApiError from "../../Helpers/ApiError.js";
import {
  deleteFromCloudinary,
  uploadWithRetry,
} from "../../Helpers/cloudinary.js";
import unlinkFiles from "../../Helpers/fileUnlinker.js";

const uploadProductImages = async (image, gallery) => {
  const thumbnailUploaded = await uploadWithRetry(files.image.path);
  if (!thumbnailUploaded) {
    fs.unlinkSync(files.image.path);
    throw new ApiError(400, "Technical issue, cannot upload image.");
  }
  const galleryData = [];
  for (const image of gallery) {
    const uploaded = await uploadWithRetry(image.path);
    galleryData.concat({
      thumbnail: uploaded.url,
      public_id: uploaded.public_id,
    });
    if (!uploaded) {
      fs.unlinkSync(image.path);
      throw new ApiError(400, "Technical issue, cannot upload image.");
    }
  }
};

export const createProductService = async (
  {
    title,
    shortDescription,
    description,
    category,
    tags,
    base_price,
    base_mrp,
    stock,
    brand,
  },
  creater_user_id
) => {
  const product = await Product.create({
    title,
    shortDescription,
    description, //(optional)
    category,
    tags,
    status: "draft",
    seller: creater_user_id,
    base_price,
    base_mrp,
    stock,
    brand,
  });

  if (!product) {
    throw new ApiError(404, "Categories not found.");
  }
  return product;
};

export const getProducts = async ({ filter }, sellerId) => {
  return await Product.find({ status: filter, seller: sellerId });
};

export const addThumbnailService = async (productId, thumbnail) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product not found.");
  }
  if (!thumbnail) {
    throw new ApiError(400, "Please add a thumbnail.");
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
  return true;
};

export const addGalleryImagesService = async (productId, gallery) => {
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
      gallery.map((img) => uploadWithRetry(img.path))
    );

    const formattedImages = uploadedImages.map((img) => ({
      public_id: img.public_id,
      url: img.secure_url,
    }));

    product.gallery.push(...formattedImages);
    await product.save();

    return product.gallery;
  } catch (error) {
    // rollback cloudinary uploads if DB fails
    if (uploadedImages.length) {
      await Promise.allSettled(
        uploadedImages.map((img) => deleteFromCloudinary(img.public_id))
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
    { new: true, runValidators: true } // new : true returns updated document
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
    publicIds.map((id) => deleteFromCloudinary(id))
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
    { new: true }
  );

  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  return product;
};
