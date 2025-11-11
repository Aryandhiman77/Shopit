import ApiResponse from "../../Helpers/ApiResponse.js";
import AsyncWrapper from "../../Helpers/AsyncWrapper.js";
import {
  createBrandService,
  getBrandsService,
  getSingleBrandService,
  updateBrandService,
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
