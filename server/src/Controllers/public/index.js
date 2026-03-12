import AsyncWrapper from "../../Helpers/AsyncWrapper.js";
import ApiResponse from "../../Helpers/ApiResponse.js";
import {
  getCategoryBrandsService,
  getCategoryProductsService,
  getCategoryService,
  getProductsByQueryStringFilters,
  getStructuredCategories,
} from "../../Services/public/categoryServices.js";
import User from "../../Models/user.js";
import { getProductDetail } from "../../Services/public/products.service.js";

export const getCategories = AsyncWrapper(async (req, res) => {
  const categories = await getCategoryService(req.params);
  return res
    .status(200)
    .json(new ApiResponse(200, categories, "Categories found."));
});

export const getAllStructuredCategories = AsyncWrapper(async (req, res) => {
  const categories = await getStructuredCategories();
  return res
    .status(200)
    .json(new ApiResponse(200, categories, "Categories found."));
});

export const getCategoryProducts = AsyncWrapper(async (req, res) => {
  const products = await getCategoryProductsService(req.query);
  return res
    .status(200)
    .json(new ApiResponse(200, products, "Products found."));
});

export const getProducts = AsyncWrapper(async (req, res) => {
  const products = await getProductsByQueryStringFilters(req?.query);
  return res
    .status(200)
    .json(new ApiResponse(200, products, "Products found."));
});
export const getProduct = AsyncWrapper(async (req, res) => {
  const product = await getProductDetail(req.params);
  return res.status(200).json(new ApiResponse(200, product, "Product found."));
});
export const getCategoryBrands = AsyncWrapper(async (req, res) => {
  const brands = await getCategoryBrandsService(req.params);
  return res.status(200).json(new ApiResponse(200, brands, "Brands found."));
});
