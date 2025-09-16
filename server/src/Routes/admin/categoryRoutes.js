import express from "express";
import { upload } from "../../Middlewares/multer.js";
import {
  createCategory,
  getCategories,
  updateCategory,
} from "../../Controllers/admin/category.controller.js";
import validate from "../../Middlewares/validate.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../../validations/admin/category.validations.js";
const categoryRoutes = express.Router();

categoryRoutes
  .post(
    "/create",
    upload.single("image"),
    validate(createCategorySchema),
    createCategory
  )
  .get("/:level", getCategories)
  .patch(
    "/update/:slug",
    upload.single("image"),
    validate(updateCategorySchema),
    updateCategory
  );

export default categoryRoutes;
