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

export const addGalleryService = async (productId, gallery) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product not found.");
  }
  if (!gallery || gallery.length === 0) {
    throw new ApiError(400, "Please add a gallery.");
  }
  if (product.gallery?.length + gallery.length > 10) {
    throw new ApiError(
      400,
      "Product gallery cannot contain more than 10 images."
    );
  }
  const isAllUploaded = await Promise.allSettled(
    gallery.map((img) => uploadWithRetry(img.path))
  );
  const successfulUploads = isAllUploaded
    .filter((u) => u.status === "fulfilled")
    .map((u) => {
      return {
        public_id: u.value.public_id,
        url: u.value.secure_url,
      };
    });
  if (gallery.length > successfulUploads.length) {
    throw new ApiError(400, "Cannot upload complete gallery.");
  }

  product.gallery = successfulUploads;
  const saved = await product.save();
  if (!saved) throw new ApiError(400, "Cannot upload complete gallery.");
  // delete images from gallery
  await unlinkFiles(gallery);
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
