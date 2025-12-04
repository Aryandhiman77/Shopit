import express from "express";
import validate from "../../Middlewares/validate.js";
import { brandRequestRules } from "../../validations/seller/brand.validation.js";
import { upload } from "../../Middlewares/multer.js";
import { jsonParser } from "../../Helpers/jsonParser.js";
import { requestBrand } from "../../Controllers/seller/brand.controller.js";
const brandRoutes = express.Router();

brandRoutes.post(
  "/create-request",
  upload.single("logo"), // logo
  jsonParser(["categories"]), // parsing arrays inside objects
  validate(brandRequestRules),
  requestBrand
);

export default brandRoutes;
