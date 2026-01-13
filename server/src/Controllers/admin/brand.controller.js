import ApiResponse from "../../Helpers/ApiResponse.js";
import AsyncWrapper from "../../Helpers/AsyncWrapper.js";
import BrandRequest from "../../Models/brandRequests.js";
import {
  approveSellerDocumentsAndCreateBrand,
  createBrandService,
  deleteBrandService,
  getBrandsService,
  getSingleBrandService,
  updateBrandService,
  getAllSellersBrandRequests,
} from "../../Services/adminServices/brandServices.js";
import fs from "fs";

export const createBrand = AsyncWrapper(async (req, res, next) => {
  try {
    const { brand } = await createBrandService(req.data, req.file);
    return res
      .status(200)
      .json(new ApiResponse(200, brand, "Brand created successfully."));
  } catch (error) {
    let err = error;
    fs.unlink(req.file.path, (errors) => (err += errors));
    next(err);
  }
});

export const getAllBrands = AsyncWrapper(async (req, res) => {
  const brands = await getBrandsService();
  return res
    .status(200)
    .json(new ApiResponse(200, brands, "Brand created successfully."));
});

export const getSingleBrand = AsyncWrapper(async (req, res) => {
  const { slug } = req.params;

  const brand = await getSingleBrandService({ slug });
  return res
    .status(200)
    .json(new ApiResponse(200, brand, "Brand created successfully."));
});

export const updateBrand = AsyncWrapper(async (req, res, next) => {
  const { slug } = req.params;
  try {
    const { brand } = await updateBrandService({ ...req.data, slug }, req.file);
    return res
      .status(200)
      .json(new ApiResponse(200, brand, "Brand updated successfully."));
  } catch (error) {
    let err = error;
    if (req.file) {
      fs.unlink(req.file.path, (errors) => (err += errors));
    }
    next(err);
  }
});

export const deleteBrand = AsyncWrapper(async (req, res) => {
  const { slug } = req.params;
  await deleteBrandService({ slug });
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Brand deleted successfully."));
});

// verify docs and create requested brand

export const getAllBrandRequests = AsyncWrapper(async (req, res) => {
  const requests = await getAllSellersBrandRequests();
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        requests,
        "Seller Brand Requests fetched successfully."
      )
    );
});

export const approveSellerDocsAndCreateBrand = AsyncWrapper(async (req, res) => {
  const { reqId } = req.params;

  const brand = await approveSellerDocumentsAndCreateBrand(reqId);
  return res
    .status(200)
    .json(
      new ApiResponse(200, brand, "Brand verified and created successfully.")
    );
});
