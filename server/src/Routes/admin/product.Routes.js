import express from "express";
import { upload } from "../../Middlewares/multer.js";
import { jsonParser } from "../../Helpers/jsonParser.js";
import { getProducts } from "../../Controllers/admin/product.controller.js";
import pagination from "../../Middlewares/Filters/pagination.js";
import productFilters from "../../Middlewares/Filters/product.filters.js";
import sortingFilters from "../../Middlewares/Filters/sorting.filters.js";

const productRoutes = express.Router();

productRoutes.get("/", pagination, sortingFilters, productFilters, getProducts); // use query to get the featured products.

export default productRoutes;
