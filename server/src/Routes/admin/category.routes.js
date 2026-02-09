import express from "express";
import { upload } from "../../Middlewares/multer.js";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  updateCategoryImageController,
  updateCategoryStatus,
  getSingleCategory,
} from "../../Controllers/admin/category.controller.js";
import validate from "../../Middlewares/validate.js";
import {
  createCategorySchema,
  updateCategorySchema,
  updateStatusSchema,
} from "../../validations/admin/category.validations.js";
import { jsonParser } from "../../Helpers/jsonParser.js";
const categoryRoutes = express.Router();

categoryRoutes
  .post(
    "/create",
    upload.single("image"),
    jsonParser(["attributes"]),
    validate(createCategorySchema),
    createCategory,
  )
  .get("/:catId", getSingleCategory)
  .patch("/update/:catId", validate(updateCategorySchema), updateCategory)
  .patch(
    "/update-cat-status/:catId",
    validate(updateStatusSchema),
    updateCategoryStatus,
  )
  .patch(
    "/update/:catId/image",
    upload.single("image"),
    updateCategoryImageController,
  )
  .delete("/delete/:categoryId", deleteCategory);

export default categoryRoutes;
