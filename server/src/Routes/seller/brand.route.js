import express from "express";
import validate from "../../Middlewares/validate.js";
import { brandRequestRules } from "../../validations/seller/brand.validation.js";
import { upload } from "../../Middlewares/multer.js";
import { jsonParser } from "../../Helpers/jsonParser.js";
import {
  getBrandRequests,
  requestBrand,
  requestDocs,
} from "../../Controllers/seller/brand.controller.js";
const brandRoutes = express.Router();

brandRoutes.post(
  "/create-request",
  upload.single("logo"), // logo
  jsonParser(["categories"]), // parsing arrays inside objects
  validate(brandRequestRules),
  requestBrand
);
brandRoutes.get("/seller-brand-requests", getBrandRequests);
brandRoutes.post(
  "/request-docs-verification/:reqId",
  upload.array("docFiles", 3), // logo
  jsonParser(["docNames"]), // parsing arrays inside objects
  requestDocs
);

export default brandRoutes;
