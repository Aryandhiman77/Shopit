import ApiError from "../../Helpers/ApiError.js";
import Brand from "../../Models/brand.js";
import BrandRequest from "../../Models/brandRequests.js";
import { uploadWithRetry } from "../../Helpers/cloudinary.js";
import fs from "fs";
import AsyncWrapper from "../../Helpers/AsyncWrapper.js";
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

