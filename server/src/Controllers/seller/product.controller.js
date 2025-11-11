import AsyncWrapper from "../../Helpers/AsyncWrapper.js";
import ApiResponse from "../../Helpers/ApiResponse.js";
import { createProductService } from "../../Services/sellerServices/productServices.js";

export const createProductController = AsyncWrapper(async (req, res) => {
  const { product } = await createProductService(req.data, req.files);
  res.status(200).json(new ApiResponse(200, product, "data found."));
});
