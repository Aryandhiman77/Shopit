import express from "express";
import { upload } from "../../Middlewares/multer.js";
import { jsonParser } from "../../Helpers/jsonParser.js";
import { getProducts } from "../../Controllers/admin/product.controller.js";

const productRoutes = express.Router();

productRoutes.get("/", getProducts); // use query to get the featured products.

export default productRoutes;
