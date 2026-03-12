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
import { brandRequestionRejectionMail } from "../../Helpers/html/seller/brandRejected.js";
import mongoose from "mongoose";
import unlinkFiles from "../../Helpers/fileUnlinker.js";

export const createBrandService = async (
  { name, description, isActive, isVerified, categories },
  file,
) => {
  if (!file) {
    throw new ApiError(400, "Brand image is required.");
  }
  const isExistingBrand = await Brand.findOne({ name });
  if (isExistingBrand) {
    throw new ApiError(400, "Brand already exists.");
  }
  const uploaded = await uploadWithRetry(file.path);
  if (!uploaded) {
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
  unlinkFiles(file);
  if (!createdBrand)
    throw new ApiError(400, "Technical issue, cannot create brand.");
  return createdBrand;
};

export const getBrandsService = async () => {
  const brands = await Brand.find().populate("categories", "name");
  return brands;
};

export const getSingleBrandService = async ({ slug }) => {
  const brand = await Brand.findOne({ slug })
    .select("name slug createdAt updatedAt isActive image.url -_id")
    .populate("categories", "name slug isVerified image.url -_id");
  if (!brand) {
    throw new ApiError(404, "Brand not found.");
  }
  return brand;
};

export const updateBrandService = async ({
  name,
  description,
  isActive,
  isVerified,
  categories,
  id,
}) => {
  const brand = await Brand.findById(id);

  if (name) brand.name = name;
  if (description) brand.description = description;
  if (isActive !== undefined) brand.isActive = isActive;
  if (isVerified !== undefined) brand.isVerified = isVerified;
  if (categories?.length > 0) brand.categories = categories;

  const saved = await brand.save();
  if (!saved) {
    throw new ApiError(400, "Brand updation failed.", [
      "Brand updation failed.",
    ]);
  }
  const populated = await Brand.findById(saved._id).populate(
    "categories",
    "name",
  );
  return populated;
};

export const updateBrandLogoService = async (id, file) => {
  if (!file) {
    throw new ApiError(400, "Logo updation failed.", [
      "Please provide a logo.",
    ]);
  }
  const brand = await Brand.findById(id).select("logo");
  if (!brand) {
    throw new ApiError(400, "Invalid Brand id.");
  }
  // upload to cloudinary
  const uploaded = await uploadWithRetry(file?.path);
  if (!uploaded) {
    throw new ApiError(400, "Logo updation failed.", ["Cannot upload logo."]);
  }
  brand.logo.public_id = uploaded.public_id;
  brand.logo.url = uploaded.secure_url;
  const saved = await brand.save();
  if (!saved) {
    unlinkFiles(file);
    throw new ApiError(400, "Logo updation failed.", ["Cannot upload logo."]);
  }
  return { logo: brand.logo.url };
};

export const deleteBrandService = async ({ id }) => {
  const brand = await Brand.findById({ _id: id }).select("_id logo");
  if (!brand) {
    throw new ApiError(404, "Brand not found.");
  }
  // console.log(brand.logo.public_id);
  if (brand.logo?.public_id) {
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

export const rejectSellerDocumentWithMessage = async (
  reqId,
  rejectedDocIds,
  rejectionNote,
) => {
  const request = await BrandRequest.findOne({
    status: "processing",
    _id: reqId,
  }).populate("requestedBy", "name email -_id");
  if (!request) {
    throw new ApiError(404, "No request found.");
  }
  request.status = "processing";

  const updated = await BrandRequest.updateOne(
    { _id: request._id },
    {
      $set: {
        "documents.$[doc].verified": "rejected",
      },
    },
    {
      arrayFilters: [{ "doc._id": { $in: rejectedDocIds } }],
    },
  );
  if (!updated) {
    throw new ApiError(400, "Cannot update documents.");
  }
  request.adminNotes = rejectionNote;
  request.status = "pending";
  await request.save();
};

export const rejectSellerRequestWithMessage = async (
  reqId,
  rejectionMessage,
) => {
  const request = await BrandRequest.findOne({
    status: "processing",
    _id: reqId,
  }).populate("requestedBy", "name email -_id");
  if (!request) {
    throw new ApiError(404, "No request found.");
  }
  request.status = "rejected";
  request.adminNotes = rejectionMessage;
  const saved = await request.save();

  if (!saved) throw new ApiError(404, "Cannot save request.");

  mailSender({
    from: process.env.COMPANY_NAME,
    to: request.requestedBy.email,
    subject: "Brand request rejected.",
    html: brandRequestionRejectionMail({
      BRAND_NAME: request.brandName,
      SELLER_NAME: request.requestedBy.name,
      REASON: saved.adminNotes,
    }),
  });
};
