import ApiError from "../../Helpers/ApiError.js";
import {
  deleteFromCloudinary,
  uploadWithRetry,
} from "../../Helpers/cloudinary.js";
import Brand from "../../Models/brand.js";
import fs from "fs";
import BrandRequest from "../../Models/brandRequests.js";
import mailSender from "../../Helpers/nodeMailer.js";
import { brandApprovedMail } from "../../Helpers/html/seller/brandApproved.js";

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
    throw new ApiError(400, "Brand already exists.");
  }
  const uploaded = await uploadWithRetry(file.path);
  if (!uploaded) {
    fs.unlinkSync(file.path);
    throw new ApiError(400, "Technical issue, cannot upload brand logo.");
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
    // seller:"Shop-it" // ! should not be static
  };
  return { brand: savedBrand };
};

export const getBrandsService = async () => {
  const brands = await Brand.find({})
    .select("name slug createdAt updatedAt isActive image.url -_id")
    .populate("categories", "name slug isActive isVerified image.url -_id");

  if (brands.length <= 0) {
    throw new ApiError(404, "Brands not found.");
  }
  return brands;
};

export const getSingleBrandService = async ({ slug }) => {
  const brand = await Brand.findOne({ slug })
    .select("name slug createdAt updatedAt isActive image.url -_id")
    .populate("categories", "name slug isActive isVerified image.url -_id");
  if (!brand) {
    throw new ApiError(404, "Brand not found.");
  }
  return brand;
};

export const updateBrandService = async (
  { name, description, isActive, isVerified, categories, slug },
  file
) => {
  const brand = await Brand.findOne({ slug });

  if (!brand) {
    if (file?.path) fs.unlinkSync(file.path);
    throw new ApiError(404, "Brand not found.");
  }

  let uploaded;

  // If file provided, upload new image
  if (file) {
    uploaded = await uploadWithRetry(file.path);
    fs.unlinkSync(file.path);

    if (!uploaded) {
      throw new ApiError(400, "Technical issue, cannot upload image.");
    }

    // delete old image from Cloudinary if exists
    if (brand.logo?.public_id) {
      await deleteFromCloudinary(brand.logo.public_id);
    }

    brand.logo = {
      url: uploaded.url,
      public_id: uploaded.public_id,
    };
  }

  if (name) brand.name = name;
  if (description) brand.description = description;
  if (isActive !== undefined) brand.isActive = isActive;
  if (isVerified !== undefined) brand.isVerified = isVerified;
  if (categories?.length > 0) brand.categories = categories;

  const createdBrand = await brand.save();
  if (!createdBrand) {
    fs.unlinkSync(file.path);
    throw new ApiError(500, "Technical issue, cannot save brand.");
  }
  return {
    brand: {
      name: createdBrand.name,
      description: createdBrand.description,
      logo: createdBrand.logo.url,
      slug: createdBrand.slug,
      isActive: createdBrand.isActive,
      isVerified: createdBrand.isVerified,
    },
  };
};

export const deleteBrandService = async ({ slug }) => {
  const brand = await Brand.findOne({ slug }).select("_id logo");
  if (!brand) {
    throw new ApiError(404, "Brand not found.");
  }
  // console.log(brand.logo.public_id);
  if (brand?.logo?.public_id) {
    await deleteFromCloudinary(brand.logo.public_id);
  }

  const deleted = await Brand.findByIdAndDelete(brand.id);
  if (!deleted) {
    throw new ApiError(404, "Cannot delete brand.");
  }
};

export const getAllSellersBrandRequests = async () => {
  const requests = await BrandRequest.find({ status: "processing" });
  return requests;
};

export const approveSellerDocumentsAndCreateBrand = async (reqId) => {
  const request = await BrandRequest.findOne({
    status: "processing",
    _id: reqId,
  }).populate("requestedBy", "name email -_id");
  if (!request) {
    throw new ApiError(404, "No request found.");
  }

  // CHANGE THE REQUEST AND DOCS STATUS TO APPROVED
  request.documents.forEach((doc) => {
    doc.verified = "approved";
  });
  request.status = "approved";

  // CREATE BRAND
  const brandData = {
    name: request.brandName,
    description: request.description,
    isActive: true,
    isVerified: false,
    categories: request.categories,
    logo: request.logo,
    seller: request.requestedBy._id,
  };

  const isBrandCreated = await Brand.create(brandData);
  if (!isBrandCreated) {
    throw new ApiError(404, "Cannot create Brand.");
  }
  request.id = isBrandCreated.id;
  await request.save();
  mailSender({
    from: process.env.COMPANY_NAME,
    to: request.requestedBy.email,
    subject: "Brand Approved",
    html: brandApprovedMail({
      BRAND_NAME: request.brandName,
      SELLER_NAME: request.requestedBy.name,
    }),
  });

  return isBrandCreated;
};

export const rejectSellerDocumentWithMessage = async (reqId, message) => {
  const request = await BrandRequest.findOne({
    status: "processing",
    _id: reqId,
  });
  if (!request) {
    throw new ApiError(404, "No request found.");
  }
};
export const rejectSellerRequestWithMessage = async (reqId, message) => {
  const request = await BrandRequest.findOne({
    status: "processing",
    _id: reqId,
  });
  if (!request) {
    throw new ApiError(404, "No request found.");
  }
};
