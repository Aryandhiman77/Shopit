import ApiError from "../../Helpers/ApiError.js";
import Brand from "../../Models/brand.js";
import BrandRequest from "../../Models/brandRequests.js";
import { uploadWithRetry } from "../../Helpers/cloudinary.js";
import fs from "fs";
import AsyncWrapper from "../../Helpers/AsyncWrapper.js";
import { upload } from "../../Middlewares/multer.js";
import mongoose from "mongoose";
import mailSender from "../../Helpers/nodeMailer.js";
import { brandRequestMail } from "../../Helpers/html/seller/brandRequest.js";
export const requestBrandToAdmin = async (
  { brandName, description, categories },
  file,
  userid
) => {
  // check for existing brandname
  const existing = await Brand.findOne({ name: brandName });
  if (existing) {
    fs.unlinkSync(file.path);
    throw new ApiError(400, "Brand already exist.");
  }

  //check for exisiting request with brandname
  const existingReq = await BrandRequest.findOne({ brandName });
  if (existingReq) {
    fs.unlinkSync(file.path);
    throw new ApiError(400, "Brand already requested for this brand name.");
  }

  // else create the brandrequest
  let request = {
    brandName,
    description,
    categories,
    requestedBy: userid,
    logo: {
      public_id: undefined,
      url: undefined,
    },
  };
  // upload files first..
  const uploaded = await uploadWithRetry(file.path);
  if (!uploaded) {
    throw new ApiError(400, "Cannot upload logo.");
  }

  fs.unlinkSync(file.path);

  request.logo.public_id = uploaded.public_id;
  request.logo.url = uploaded.url;

  const createRequest = await BrandRequest.create(request);
  if (!createRequest) {
    fs.unlinkSync(file.path);
    throw new ApiError(400, "Cannot request for brand, try again later.");
  }
  return true;
};

export const getAllBrandRequests = async (userid) => {
  const requests = await BrandRequest.find({ requestedBy: userid });
  return requests;
};

export const sendDocsToAdminForVerification = async (
  docNames,
  docs,
  requestId,
  userid
) => {
  // 1. VERIFY USER REQUEST
  const request = await BrandRequest.findOne({
    requestedBy: userid,
    _id: requestId,
  }).populate("requestedBy", "name email -_id");

  if (!request) {
    throw new ApiError(400, "No brand request found.");
  }

  if (request.status === "processing") {
    throw new ApiError(400, "Brand Request already in processing.");
  }
  //2.documents upload and save the urls in db
  const validDocNames = ["gst", "pan", "trademark"];
  if (validDocNames.every((val) => docNames.includes(val))) {
    throw new ApiError(400, "Invalid Documents");
  }
  if (docs.length < 3) {
    throw new ApiError(400, "Upload all GST,PAN,Trademark Certificate.");
  }

  const documents = await Promise.all(
    docs.map(async (doc, i) => {
      const uploaded = await uploadWithRetry(doc.path);
      if (!uploaded) {
        throw new ApiError(400, `Cannot upload ${doc.name} document.`);
      }
      fs.unlinkSync(doc.path);
      return {
        type: docNames[i],
        url: uploaded.url,
        public_id: uploaded.public_id,
        verified: "pending",
      };
    })
  );

  const isUpdated = await BrandRequest.findByIdAndUpdate(request.id, {
    documents,
    status: "processing",
  });
  if (!isUpdated) {
    throw new ApiError(400, "Failed to upload documents.");
  }
  mailSender({
    from: process.env.COMPANY_NAME,
    to: request.requestedBy.email,
    subject: "Brand Request submitted",
    html: brandRequestMail({
      SELLER_NAME: request.requestedBy.name,
      BRAND_NAME: request.brandName,
    }),
  });
  return true;
};
