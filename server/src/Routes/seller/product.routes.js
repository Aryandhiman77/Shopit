import express from "express";
import { upload } from "../../Middlewares/multer.js";
import { createProductController } from "../../Controllers/seller/product.controller.js";
import { jsonParser } from "../../Helpers/jsonParser.js";
import validate from "../../Middlewares/validate.js";
import { createProductSchema } from "../../validations/seller/product.validations.js";
const productRoutes = express.Router();

productRoutes.post(
  "/create",
  upload.any(),
  jsonParser(["attributes", "variants"]),
  validate(createProductSchema),
  createProductController
);

export default productRoutes;
