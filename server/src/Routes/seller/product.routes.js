import express from "express";
import { upload } from "../../Middlewares/multer.js";
import {
  createProductController,
  deleteGalleryImagesController,
  getDraftProducts,
  productAttributesController,
  productGalleryController,
  productThumbnailController,
  updateProductStatus,
} from "../../Controllers/seller/product.controller.js";
import validate from "../../Middlewares/validate.js";
import {
  createProductAttributesSchema,
  createProductBasicSchema,
  updateProductStatusSchema,
  
} from "../../validations/seller/product.validations.js";
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
  )
  .patch(
    "/:productId/attributes",
    (req, res, next) => {
      req.body.productId = req.params.productId;
      next();
    },
    validate(createProductAttributesSchema),
    productAttributesController
  )
  .delete("/:productId/gallery", deleteGalleryImagesController).patch("/:productId/status",validate(updateProductStatusSchema),updateProductStatus);
  


export default productRoutes;
