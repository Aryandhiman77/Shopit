import express from "express";
import { upload } from "../../Middlewares/multer.js";
import { createCategory } from "../../Controllers/admin/category.controller.js";
import validate from "../../Middlewares/validate.js";
import { createCategorySchema } from "../../validations/admin/category.validations.js";
const categoryRoutes = express.Router();

categoryRoutes.post(
  "/create",
  upload.single("image"), // body parsed
  validate(createCategorySchema), 
  createCategory
);

export default categoryRoutes;
