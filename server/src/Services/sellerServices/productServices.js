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

export const createProductService = async ({
  title,
  shortDescription,
  description,
  category,
  tags,
  base_price,
  base_mrp
}) => {
  const createdProduct = await Product.create({
    title,
    shortDescription,
    description,
    category,
    tags,
    status: "draft",
    seller: req.user.id,
    base_price,
    base_mrp,
    stock,
  });

  return { product: createdProduct };
};
