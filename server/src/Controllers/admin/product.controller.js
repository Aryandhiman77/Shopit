import ApiResponse from "../../Helpers/ApiResponse.js";
import AsyncWrapper from "../../Helpers/AsyncWrapper.js";
import { getProductsService } from "../../Services/AdminSeller/productServices.js";

export const getProducts = AsyncWrapper(async (req, res) => {
  const products = await getProductsService(req.query);
  return res
    .status(200)
    .json(new ApiResponse(200, products, "Products found."));
});
