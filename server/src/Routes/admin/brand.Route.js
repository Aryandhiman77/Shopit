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
  getBrands,
  getSingleBrand,
  rejectSellerDocsWithMessage,
  rejectSellerRequest,
  updateBrand,
  updateBrandLogo,
} from "../../Controllers/admin/brand.controller.js";
import pagination from "../../Middlewares/Filters/reusable/pagination.js";
import sortingFilters from "../../Middlewares/Filters/reusable/sorting.filters.js";
import brandFilters from "../../Middlewares/Filters/brand.filters.js";
const brandRoutes = express.Router();

brandRoutes
  .post(
    "/create",
    upload.single("image"),
    jsonParser(["categories"]),
    validate(createBrandSchema),
    createBrand,
  )
  .get("/", pagination, sortingFilters, brandFilters, getBrands)
  .get("/get-brand/:slug", getSingleBrand)
  .patch("/:id/update", validate(updateBrandSchema), updateBrand)
  .patch("/:id/logo", upload.single("image"), updateBrandLogo)
  .delete("/:id/delete", deleteBrand)
  .get("/all-brand-requests", getAllBrandRequests)
  .put("/approve-seller-docs/:reqId", approveSellerDocsAndCreateBrand)
  .patch("/reject-seller-docs/:reqId", rejectSellerDocsWithMessage)
  .patch("/reject-seller-request/:reqId", rejectSellerRequest);

export default brandRoutes;
