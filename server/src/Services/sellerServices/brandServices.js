import ApiError from "../../Helpers/ApiError.js";
import Brand from "../../Models/brand.js";
import BrandRequest from "../../Models/brandRequests.js";
export const requestBrandToAdmin = async (
  { brandName, description, categories },
  files
) => {
  // check for existing brandname
  const existing = await Brand.findOne({ name: brandName });
  if (existing) {
    throw new ApiError(400, "Brand already exist.");
  }

  //check for exisiting request with brandname
  const existingReq = await BrandRequest.findOne({ brandName });
  if (existingReq) {
    throw new ApiError(400, "Brand already requested for this brand name.");
  }

  // else create the brandrequest
  const request = {
    brandName,
    description,
    categories,
    requestedBy: req.user,
  };

  //   const createRequest = await BrandRequest.create();

  return true;
};
