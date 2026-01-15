import fs from "fs";
import AsyncWrapper from "../../Helpers/AsyncWrapper.js";
import ApiResponse from "../../Helpers/ApiResponse.js";
import {
  addThumbnailService,
  createProductService,
  getProducts,
} from "../../Services/sellerServices/productServices.js";
import unlinkFiles from "../../Helpers/fileUnlinker.js";

export const createProductController = AsyncWrapper(async (req, res) => {
  const product = await createProductService(req.data, req.user.id);
  res
    .status(200)
    .json(new ApiResponse(200, product, "Product created successfully"));
});
export const getDraftProducts = AsyncWrapper(async (req, res) => {
  const products = await getProducts({ filter: "draft" }, req.user.id);
  res.status(200).json(new ApiResponse(200, products, "Products found."));
});

export const productThumbnailController = AsyncWrapper(
  async (req, res, next) => {
    const { productId } = req.params;
    try {
      await addThumbnailService(productId, req.file);
      res
        .status(200)
        .json(new ApiResponse(200, null, "Thumbnail added successfully."));
    } catch (error) {
      console.log(req.file);
      await unlinkFiles(req.file?.path);
      next(error);
    }
  }
);
export const productGalleryController = AsyncWrapper(async (req, res, next) => {
  const { productId } = req.params;
  try {
    await addGalleryService(productId,req.files);
    res
        .status(200)
        .json(new ApiResponse(200, null, "Gallery images added successfully."));
  } catch (error) {
    unlinkFiles(req.files)
    next(error);
  }
});
