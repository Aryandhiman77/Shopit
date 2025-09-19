import AsyncWrapper from "../../Helpers/AsyncWrapper.js";
import ApiResponse from "../../Helpers/ApiResponse.js";

export const createProductController = AsyncWrapper(async (req, res) => {
  //   const { product } = await createProductService(req.data);
  res.status(200).json(new ApiResponse(200, req.data, "data found."));
});
