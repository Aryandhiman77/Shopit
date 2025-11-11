import express from "express";
import validate from "../../Middlewares/validate.js";
import { jsonParser } from "../../Helpers/jsonParser.js";
import { upload } from "../../Middlewares/multer.js";
import { createBrandSchema } from "../../validations/admin/brand.validations.js";
import {
  createBrand,
  getAllBrands,
  getSingleBrand,
} from "../../Controllers/admin/brand.controller.js";
const brandRoutes = express.Router();

brandRoutes
  .post(
    "/create-brand",
    upload.single("image"),
    jsonParser(["categories"]),
    validate(createBrandSchema),
    createBrand
  )
  .get("/", getAllBrands)
  .get("/:slug", getSingleBrand);

export default brandRoutes;
