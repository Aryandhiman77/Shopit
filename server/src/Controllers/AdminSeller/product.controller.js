import fs from "fs";
import AsyncWrapper from "../../Helpers/AsyncWrapper.js";
import ApiResponse from "../../Helpers/ApiResponse.js";
import {
  addGalleryImagesService,
  addProductAttributes,
  addThumbnailService,
  createProductService,
  deleteGalleryImages,
  getAllProducts,
  getProducts,
  updateProductService,
  updateProductStatusService,
} from "../../Services/AdminSeller/productServices.js";
import unlinkFiles from "../../Helpers/fileUnlinker.js";

export const createProductController = AsyncWrapper(async (req, res) => {
  const product = await createProductService(req.data, req.user.id);
  res
    .status(200)
    .json(new ApiResponse(200, product, "Product created successfully"));
});
export const getMyDraftProducts = AsyncWrapper(async (req, res) => {
  const products = await getProducts({ filter: "draft" }, req.user.id);
  res.status(200).json(new ApiResponse(200, products, "Products found."));
});
export const getSellerProducts = AsyncWrapper(async (req, res) => {
  const products = await getAllProducts(req.user.id);
  res.status(200).json(new ApiResponse(200, products, "Products found."));
});

export const productThumbnailController = AsyncWrapper(
  async (req, res, next) => {
    const { productId } = req.params;
    try {
      const thumbnail = await addThumbnailService(productId, req.file);
      res
        .status(200)
        .json(new ApiResponse(200, thumbnail, "Thumbnail added successfully."));
    } catch (error) {
      console.log(req.file);
      await unlinkFiles(req.file?.path);
      next(error);
    }
  },
);

export const productGalleryController = AsyncWrapper(async (req, res, next) => {
  const { productId } = req.params;
  console.log(req.files);
  try {
    const gallery = await addGalleryImagesService(productId, req.files);
    res
      .status(200)
      .json(
        new ApiResponse(200, gallery, "Gallery images added successfully."),
      );
  } catch (error) {
    await unlinkFiles(req.files);
    next(error);
  }
});

export const productAttributesController = AsyncWrapper(async (req, res) => {
  const updatedProduct = await addProductAttributes(req.data);
  res
    .status(200)
    .json(
      new ApiResponse(200, updatedProduct, "Attributes added successfully."),
    );
});

export const deleteGalleryImagesController = AsyncWrapper(async (req, res) => {
  const { productId } = req.params;
  const { deleted, failed } = await deleteGalleryImages(
    productId,
    req.body.publicIds,
  );
  res
    .status(200)
    .json(
      new ApiResponse(200, { deleted, failed }, `${deleted} images deleted.`),
    );
});

export const updateProductStatus = async (req, res) => {
  const { productId } = req.params;
  const { status } = req.body;

  const product = await updateProductStatusService(productId, status);

  res
    .status(200)
    .json(new ApiResponse(200, product, "Product status updated."));
};
export const updateProduct = async (req, res) => {
  const { productId } = req.params;

  const product = await updateProductService(productId, req.body);

  res.status(200).json(new ApiResponse(200, product, "Product updated."));
};
