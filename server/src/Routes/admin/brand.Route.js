import express from "express";
import validate from "../../Middlewares/validate.js";
import { jsonParser } from "../../Helpers/jsonParser.js";
import { upload } from "../../Middlewares/multer.js";
import {
  createBrandSchema,
  updateBrandSchema,
} from "../../validations/admin/brand.validations.js";
import {
  createBrand,
  deleteBrand,
  getAllBrands,
  getSingleBrand,
  updateBrand,
} from "../../Controllers/admin/brand.controller.js";
const brandRoutes = express.Router();

brandRoutes
  .post(
    "/create-brand",
    upload.single("image"),
    (req, res) => {
      res.send(req.body);
    },
    jsonParser(["categories"]),
    validate(createBrandSchema),
    createBrand
  )
  .get("/", getAllBrands)
  .get("/:slug", getSingleBrand)
  .patch(
    "/update/:slug",
    upload.single("image"),
    jsonParser(["categories"]),
    validate(updateBrandSchema),
    updateBrand
  )
  .delete("/delete/:slug", deleteBrand);

export default brandRoutes;
