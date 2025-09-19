import express from "express";
import { upload } from "../../Middlewares/multer.js";
import { createProductController } from "../../Controllers/seller/product.controller.js";
import jsonParser from "../../Helpers/jsonParser.js";
import validate from "../../Middlewares/validate.js";
const productRoutes = express.Router();

productRoutes.get(
  "/create",
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "gallery",
      maxCount: 10,
    },
  ]),
  jsonParser(["attributes"]),
  validate(createProductSchema),
  createProductController
);

export default productRoutes;
