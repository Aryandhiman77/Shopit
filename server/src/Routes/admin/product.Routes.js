import express from "express";
import { upload } from "../../Middlewares/multer.js";
import { jsonParser } from "../../Helpers/jsonParser.js";
import validate from "../../Middlewares/validate.js";
import { createProductSchema } from "../../validations/product.validation.js";
import { createProduct } from "../../Controllers/admin/product.controller.js";

const productRoutes = express.Router();

productRoutes.post(
  "/create-product",
  upload.single("image"),
  jsonParser(["attributes"]),
  validate(createProductSchema),
  createProduct
);

export default productRoutes;
