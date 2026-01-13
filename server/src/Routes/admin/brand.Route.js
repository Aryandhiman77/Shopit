import express from "express";
import validate from "../../Middlewares/validate.js";
import { jsonParser } from "../../Helpers/jsonParser.js";
import { upload } from "../../Middlewares/multer.js";
import {
  createBrandSchema,
  updateBrandSchema,
} from "../../validations/admin/brand.validations.js";
import {
  approveSellerDocsAndCreateBrand,
  createBrand,
  deleteBrand,
  getAllBrandRequests,
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
  .get("/get-brand/:slug", getSingleBrand)
  .patch(
    "/update/:slug",
    upload.single("image"),
    jsonParser(["categories"]),
    validate(updateBrandSchema),
    updateBrand
  )
  .delete("/delete/:slug", deleteBrand)
  .get("/all-brand-requests", getAllBrandRequests)
  .put("/approve-seller-docs/:reqId", approveSellerDocsAndCreateBrand);
// .patch("/approve-seller-docs/:reqId", approveSellerDocsAndCreateBrand);

export default brandRoutes;
