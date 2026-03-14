// import express from "express";
// import { upload } from "../../Middlewares/multer.js";
// import {
//   createProductController,
//   deleteGalleryImagesController,
//   getMyDraftProducts,
//   productAttributesController,
//   productGalleryController,
//   productThumbnailController,
//   updateProductStatus,
//   getSellerProducts,
//   updateProduct,
// } from "../../Controllers/AdminSeller/product.controller.js";
// import validate from "../../Middlewares/validate.js";
// import {
//   createProductAttributesSchema,
//   createProductBasicSchema,
//   updateProductStatusSchema,
// } from "../../validations/AdminSeller/product.validations.js";
// const productRoutes = express.Router();

// productRoutes
//   .post(
//     "/create-product",
//     validate(createProductBasicSchema),
//     createProductController,
//   )
//   .get("/drafts", getMyDraftProducts)
//   .get("/", getSellerProducts)
//   .patch(
//     "/:productId/thumbnail",
//     upload.single("thumbnail"),
//     productThumbnailController,
//   )
//   .patch("/:productId/update", (req, res) => res.send(req.body), updateProduct)
//   .patch(
//     "/:productId/gallery",
//     upload.array("gallery", 10),
//     productGalleryController,
//   )
//   .patch(
//     "/:productId/attributes",
//     validate(createProductAttributesSchema),
//     productAttributesController,
//   )
//   .delete("/:productId/gallery", deleteGalleryImagesController)
//   .patch(
//     "/:productId/status",
//     validate(updateProductStatusSchema),
//     updateProductStatus,
//   );

// export default productRoutes;
