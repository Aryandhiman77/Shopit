import { uploadWithRetry } from "../../Helpers/cloudinary.js";
import Brand from "../../Models/brand.js";
import fs from "fs";
export const createBrandService = async (
  { name, description, isActive, isVerified, categories },
  file
) => {
  if (!file) {
    throw new ApiError(400, "Brand image is required.");
  }
  const isExistingBrand = await Brand.findOne({ name });
  if (isExistingBrand) {
    fs.unlinkSync(file.path);
    throw new ApiError(400, "Brand already exists with this name.");
  }
  const uploaded = await uploadWithRetry(file.path);
  console.log(uploaded);
  if (!uploaded) {
    fs.unlinkSync(file.path);
    throw new ApiError(400, "Technical issue, cannot upload image.");
  }
  const brandData = {
    name,
    description,
    isActive,
    isVerified,
    categories,
    logo: {
      url: uploaded.url,
      public_id: uploaded.public_id,
    },
  };
  const createdBrand = await Brand.create(brandData);
  fs.unlinkSync(file.path);
  if (!createdBrand)
    throw new ApiError(400, "Technical issue, cannot create brand.");
  const savedBrand = {
    name: createdBrand.name,
    description: createdBrand.description,
    logo: createdBrand.logo.url,
    slug: createdBrand.slug,
    isActive: createdBrand.isActive,
    isVerified: createdBrand.isVerified,
  };
  return { brand: savedBrand };
};

export const getBrandsService = async ({ slug }) => {
  const brands = await Brand.find({ slug })
    .select("name slug createdAt updatedAt isActive image.url -_id")
    .populate(
      "parentCategory",
      "name slug createdAt updatedAt isActive isVerified image.url -_id"
    );
  if (brands.length <= 0) {
    throw new ApiError(404, "Brands not found.");
  }
  return brands;
};

// export const updateCategoryService = async (
//   { name, description, isActive, isVerified, categories },
//   file
// ) => {
//   const brand = await Brand.findOne({ slug });

//   if (!brand) {
//     if (file?.path) fs.unlinkSync(file.path);
//     throw new ApiError(404, "Brand not found.");
//   }

//   let uploaded;

//   // If file provided, upload new image
//   if (file) {
//     uploaded = await uploadWithRetry(file.path);
//     fs.unlinkSync(file.path);

//     if (!uploaded) {
//       throw new ApiError(400, "Technical issue, cannot upload image.");
//     }

//     // delete old image from Cloudinary if exists
//     if (brand.logo?.public_id) {
//       await deleteFromCloudinary(brand.logo.public_id);
//     }

//     brand.logo = {
//       url: uploaded.url,
//       public_id: uploaded.public_id,
//     };
//   }

//   if (name) brand.name = name;
//   if (description) brand.description = description;
//   if (isActive !== undefined) brand.isActive = isActive;
//   if (isVerified !== undefined) brand.isVerified = isVerified;

//   const saved = await brand.save();
//   if (!saved) {
//     fs.unlinkSync(file.path);
//     throw new ApiError(500, "Technical issue, cannot save brand.");
//   }
//   return {
//     brand: {
//       name: createdBrand.name,
//       description: createdBrand.description,
//       logo: createdBrand.logo.url,
//       slug: createdBrand.slug,
//       isActive: createdBrand.isActive,
//       isVerified: createdBrand.isVerified,
//     },
//   };
// };
