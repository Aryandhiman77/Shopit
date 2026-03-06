import ApiResponse from "../../Helpers/ApiResponse.js";
import AsyncWrapper from "../../Helpers/AsyncWrapper.js";
import { getBrandList } from "../../Services/AdminSeller/AdminSeller.services.js";

export const getBrandListing = AsyncWrapper(async (req, res) => {
  const brands = await getBrandList();
  return res.status(200).json(new ApiResponse(200, brands, "Brands found."));
});
