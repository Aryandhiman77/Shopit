import express from "express";
import { upload } from "../../Middlewares/multer.js";
import {
  createProductController,
  getDraftProducts,
  productGalleryController,
  productThumbnailController,
} from "../../Controllers/seller/product.controller.js";
import { jsonParser } from "../../Helpers/jsonParser.js";
import validate from "../../Middlewares/validate.js";
import { createProductBasicSchema } from "../../validations/seller/product.validations.js";
const productRoutes = express.Router();

productRoutes
  .post(
    "/create-product",
    validate(createProductBasicSchema),
    createProductController
  )
  .get("/drafts", getDraftProducts)
  .patch(
    "/:productId/thumbnail",
    upload.single("thumbnail"),
    productThumbnailController
  )
  .patch(
    "/:productId/gallery",
    upload.array("gallery", 10),
    productGalleryController
  );

export default productRoutes;
