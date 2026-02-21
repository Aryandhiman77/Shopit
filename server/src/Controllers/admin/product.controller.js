import ApiResponse from "../../Helpers/ApiResponse.js";
import AsyncWrapper from "../../Helpers/AsyncWrapper.js";
import { getProductsService } from "../../Services/adminServices/productServices.js";

export const createProduct = AsyncWrapper(async (req, res, next) => {
  //! not working
  try {
    const product = await createProductService(req.data, req.file);
    return res
      .status(200)
      .json(new ApiResponse(200, product, "Product created successfully."));
  } catch (error) {
    await unlinkFiles(req.file.path);
    next(err);
  }
});

export const getProducts = AsyncWrapper(async (req, res) => {
  console.log(req.query);
  const products = await getProductsService(req.query);
  return res
    .status(200)
    .json(new ApiResponse(200, products, "Products found."));
});
