import express from "express";
import { upload } from "../../Middlewares/multer.js";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../../Controllers/admin/category.controller.js";
import validate from "../../Middlewares/validate.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../../validations/admin/category.validations.js";
import { jsonParser } from "../../Helpers/jsonParser.js";
const categoryRoutes = express.Router();

categoryRoutes
  .post(
    "/create",
    upload.single("image"),
    jsonParser(["attributes"]),
    validate(createCategorySchema),
    createCategory
  )
  .get("/:level", getCategories)
  .patch(
    "/update/:slug",
    upload.single("image"),
    jsonParser(["attributes"]),
    validate(updateCategorySchema),
    updateCategory
  )
  .delete("/delete/:slug/:level", deleteCategory);

export default categoryRoutes;
