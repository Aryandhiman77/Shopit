import express from "express";
import { upload } from "../../../Middlewares/multer.js";
import {
  createProductController,
  deleteGalleryImagesController,
  getMyDraftProducts,
  productAttributesController,
  productGalleryController,
  productThumbnailController,
  updateProductStatus,
  getSellerProducts,
  updateProduct,
} from "../../../Controllers/AdminSeller/product.controller.js";
import validate from "../../../Middlewares/validate.js";
import {
  createProductAttributesSchema,
  createProductBasicSchema,
  updateProductInfoSchema,
  updateProductStatusSchema,
} from "../../../validations/AdminSeller/product.validations.js";
const productRoutes = express.Router();

productRoutes
  .post("/create", validate(createProductBasicSchema), createProductController)
  .get("/my-drafts", getMyDraftProducts)
  .get("/", getSellerProducts)
  .patch(
    "/:productId/thumbnail",
    upload.single("thumbnail"),
    productThumbnailController,
  )
  .patch("/:productId/update", validate(updateProductInfoSchema), updateProduct)
  .patch(
    "/:productId/gallery",
    upload.array("gallery", 10),
    productGalleryController,
  )
  .patch(
    "/:productId/attributes",
    validate(createProductAttributesSchema),
    productAttributesController,
  )
  .delete("/:productId/gallery", deleteGalleryImagesController)
  .patch(
    "/:productId/status",
    validate(updateProductStatusSchema),
    updateProductStatus,
  );

export default productRoutes;
