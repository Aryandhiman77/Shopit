import ApiResponse from "../../Helpers/ApiResponse.js";
import AsyncWrapper from "../../Helpers/AsyncWrapper.js";

export const createProduct = AsyncWrapper(async (req, res, next) => {
  try {
    const product = await createProductService(req.data, req.file);
    return res
      .status(200)
      .json(new ApiResponse(200, req.data, "Product created successfully."));
  } catch (error) {
    await unlinkFiles(req.file.path)
    next(err);
  }
});
