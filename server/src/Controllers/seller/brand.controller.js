import AsyncWrapper from "../../Helpers/AsyncWrapper.js";
import ApiResponse from "../../Helpers/ApiResponse.js";
import { requestBrandToAdmin } from "../../Services/sellerServices/brandServices.js";

export const requestBrand = AsyncWrapper(async (req, res) => {
  res.send(req.data, req.files);
  // const request = await requestBrandToAdmin(req.data, req.files);
  // if (request) {
  //   res
  //     .status(200)
  //     .json(new ApiResponse(200, null, "Brand requested to admin."));
  // }
});
