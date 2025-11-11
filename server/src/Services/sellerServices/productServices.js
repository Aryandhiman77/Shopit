import Product from "../../Models/product.js";
import ApiError from "../../Helpers/ApiError.js";
import { uploadWithRetry } from "../../Helpers/cloudinary.js";

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
    attributes,
    variants,
  },
  files
) => {
  //1. file uploads
  console.log(files);
  if (files.fieldname !== "image") {
    throw new ApiError(
      400,
      "Missing Product Details.",
      "Product thumbnail image is required."
    );
  }
  if (files.fieldname !== "gallery") {
    throw new ApiError(
      400,
      "Missing Product Details.",
      "Product gallery images is required."
    );
  }

  const gallery = files.gallery.map((i) => i) || [];
  await uploadProductImages(files.image, gallery);

  if (variants.length > 0) {
  }
  const createdProduct = await Product.create({
    title,
    shortDescription,
    description,
    category,
    tags,
    attributes,
    variants,
    thumbnail: {
      url: thumbnailUploaded.url,
      public_id: thumbnailUploaded.public_id,
    },
    images: galleryData,
  });
  if (!createdProduct) {
    throw new ApiError(400, "Technical issue, cannot create product.");
  }
  return { product: createdProduct };
};
