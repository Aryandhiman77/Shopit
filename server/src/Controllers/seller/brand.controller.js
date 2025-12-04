import AsyncWrapper from "../../Helpers/AsyncWrapper.js";
import ApiResponse from "../../Helpers/ApiResponse.js";
import { requestBrandToAdmin } from "../../Services/sellerServices/brandServices.js";

export const requestBrand = AsyncWrapper(async (req, res) => {
  const request = await requestBrandToAdmin(req.data, req.file, req.user.id);
  if (request) {
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          null,
          "Brand request created. Upload your documents for verfication."
        )
      );
  }
});
