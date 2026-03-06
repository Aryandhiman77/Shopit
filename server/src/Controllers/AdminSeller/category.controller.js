import ApiResponse from "../../Helpers/ApiResponse.js";
import AsyncWrapper from "../../Helpers/AsyncWrapper.js";
import { getCategoryService } from "../../Services/AdminSeller/AdminSeller.services.js";
import { getStructuredCategories } from "../../Services/public/categoyServices.js";

export const getCategories = AsyncWrapper(async (req, res) => {
  const { level } = req.params;
  const categories = await getCategoryService(level);
  return res
    .status(200)
    .json(new ApiResponse(200, categories, "Categories found."));
});

export const getOrderedCategories = AsyncWrapper(async (req, res) => {
  const userRole = req.user?.role;
  const categories = await getStructuredCategories(userRole);
  return res
    .status(200)
    .json(new ApiResponse(200, categories, "Categories found."));
});
